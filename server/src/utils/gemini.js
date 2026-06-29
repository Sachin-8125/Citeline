import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

export async function generateEmbedding(text) {
  try {
    const response = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: text,
    });

    return response.embeddings[0].values;
  } catch (error) {
    console.error('❌ Embedding generation failed:', error);
    throw new Error(`Failed to generate embedding: ${error.message}`);
  }
}

function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;

  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

export async function findRelevantChunks(query, chunks, topK = 5) {
  try {
    const queryEmbedding = await generateEmbedding(query);

    const scored = chunks
      .filter((chunk) => chunk.embedding && chunk.embedding.length > 0)
      .map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
      }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((item) => item.chunk);
  } catch (error) {
    console.error('❌ Chunk search failed:', error);
    throw new Error(`Failed to find relevant chunks: ${error.message}`);
  }
}

export async function generateChatResponse(question, relevantChunks) {
  try {
    const context = relevantChunks
      .map(
        (chunk, i) =>
          `[Passage ${i + 1} - Page ${chunk.pageNumber}]:\n${chunk.content}`
      )
      .join('\n\n');

    const systemInstruction = `You are a research assistant helping users understand academic documents.

    Answer questions based ONLY on the provided document passages.
    Always cite the page number when referencing specific content.
    If the answer is not found in the provided passages, clearly state that.
    Be concise, accurate, and scholarly in your responses.
    Do not make up information or reference content outside the passages.`;

        const prompt = `Document Passages:
    ${context}

    Question: ${question}

    Provide a clear, well-cited answer based only on the passages above.`;

    const interaction = await ai.interactions.create({
      model: 'gemini-2.5-flash',
      system: systemInstruction,
      input: prompt,
    });

    return interaction.output_text;
  } catch (error) {
    console.error('❌ Chat response generation failed:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}