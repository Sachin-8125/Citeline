import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { env } from '../config/env.js';
import { requireAuth } from '../middleware/auth.js';
import {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
  chatWithDocument,
} from '../controllers/documentController.js';

const router = Router();


const uploadDir = path.resolve(env.uploadDir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Only PDF, TXT, and DOCX files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxFileSizeMb * 1024 * 1024, 
  },
});

router.post(
  '/upload',
  requireAuth,
  upload.single('file'), 
  uploadDocument
);

router.get('/', requireAuth, getDocuments);

router.get('/:id', requireAuth, getDocument);

router.delete('/:id', requireAuth, deleteDocument);

router.post('/chat', requireAuth, chatWithDocument);

export const documentRouter = router;