import fs from 'node:fs';
import { env } from '../config/env.js';
import { Document } from '../models/Document.js';

import { generateEmbedding, findRelevantChunks, generateChatResponse } from '../utils/gemini.js';

import pdfParse from 'pdf-parse';

function createHttpError(statusCode, message) {
  return Object.assign(new Error(message), { statusCode });
}

function chunkText(text, chunkSize = 500, overlap = 50) {
  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.trim()) {
      chunks.push(chunk);
    }
  }

  return chunks;
}

async function extractTextFromPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return {
    text: data.text,
    totalPages: data.numpages,
  };
}

function extractTextFromTxt(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
  return { text, totalPages: 1 };
}

export async function uploadDocument(req, res, next) {
  let savedDocument = null;

  try {
    if (!req.file) {
      throw createHttpError(400, 'No file uploaded');
    }

    const { originalname, mimetype, size, path: filePath } = req.file;

    const maxBytes = env.maxFileSizeMb * 1024 * 1024;
    if (size > maxBytes) {
      fs.unlinkSync(filePath);
      throw createHttpError(
        413,
        `File too large. Maximum size is ${env.maxFileSizeMb}MB`
      );
    }

    savedDocument = await Document.create({
      user: req.user.id,
      name: originalname,
      originalName: originalname,
      mimeType: mimetype,
      sizeBytes: size,
      filePath,
      status: 'reading',
    });

    res.status(201).json({
      document: {
        id: savedDocument._id.toString(),
        name: savedDocument.name,
        status: savedDocument.status,
        totalPages: savedDocument.totalPages,
        createdAt: savedDocument.createdAt,
      },
    });

    processDocumentInBackground(savedDocument, filePath, mimetype);

  } catch (error) {
    if (req.file?.path && !savedDocument) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {
      }
    }
    next(error);
  }
}

async function processDocumentInBackground(document, filePath, mimetype) {
  try {
    let extractedText, totalPages;

    if (mimetype === 'application/pdf') {
      ({ text: extractedText, totalPages } =
        await extractTextFromPDF(filePath));
    } else if (mimetype === 'text/plain') {
      ({ text: extractedText, totalPages } =
        extractTextFromTxt(filePath));
    } else {
      throw new Error('Unsupported file type for text extraction');
    }

    document.totalPages = totalPages;
    document.status = 'indexing';
    await document.save();

    const rawChunks = chunkText(extractedText);

    const chunksWithEmbeddings = [];

    for (let i = 0; i < rawChunks.length; i++) {
      const content = rawChunks[i];

      const estimatedPage =
        Math.ceil((i / rawChunks.length) * totalPages) || 1;

      const embedding = await generateEmbedding(content);

      chunksWithEmbeddings.push({
        content,
        pageNumber: estimatedPage,
        embedding,
        chunkIndex: i,
      });
    }

    document.chunks = chunksWithEmbeddings;
    document.status = 'ready';
    await document.save();

    console.log(`Document "${document.name}" processed successfully`);

  } catch (error) {
    console.error(
      `Failed to process document "${document.name}":`,
      error
    );
    document.status = 'error';
    document.errorMessage = error.message;
    await document.save();
  }
}

export async function getDocuments(req, res, next) {
  try {
    const documents = await Document.find({ user: req.user.id })
      .select('-chunks')
      .sort({ createdAt: -1 });

    res.status(200).json({
      documents: documents.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        status: doc.status,
        totalPages: doc.totalPages,
        sizeBytes: doc.sizeBytes,
        createdAt: doc.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function getDocument(req, res, next) {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).select('-chunks');

    if (!document) {
      throw createHttpError(404, 'Document not found');
    }

    res.status(200).json({
      document: {
        id: document._id.toString(),
        name: document.name,
        status: document.status,
        totalPages: document.totalPages,
        sizeBytes: document.sizeBytes,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDocument(req, res, next) {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!document) {
      throw createHttpError(404, 'Document not found');
    }

    try {
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }
    } catch {
      console.warn(`Could not delete file: ${document.filePath}`);
    }

    await document.deleteOne();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function chatWithDocument(req, res, next) {
  try {
    const { message, documentId } = req.body;

    if (!message?.trim()) {
      throw createHttpError(400, 'Message is required');
    }

    if (!documentId) {
      throw createHttpError(400, 'Document ID is required');
    }

    const document = await Document.findOne({
      _id: documentId,
      user: req.user.id,
    });

    if (!document) {
      throw createHttpError(404, 'Document not found');
    }

    if (document.status !== 'ready') {
      throw createHttpError(
        400,
        `Document is not ready yet. Current status: ${document.status}`
      );
    }

    if (!document.chunks || document.chunks.length === 0) {
      throw createHttpError(400, 'Document has no processable content');
    }

    const relevantChunks = await findRelevantChunks(
      message,
      document.chunks,
      5
    );

    if (relevantChunks.length === 0) {
      return res.status(200).json({
        response:
          "I couldn't find relevant information in the document to answer your question.",
        sources: [],
      });
    }

    const response = await generateChatResponse(message, relevantChunks);

    res.status(200).json({
      response,
      sources: relevantChunks.map((chunk) => ({
        documentId: document._id.toString(),
        documentName: document.name,
        pageNumber: chunk.pageNumber,
        excerpt: chunk.content.slice(0, 150) + '...',
      })),
    });

  } catch (error) {
    next(error);
  }
}