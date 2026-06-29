import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  embedding: {
    type: [Number],
    default: [],
  },
  chunkIndex: {
    type: Number,
    required: true,
  },
});

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    sizeBytes: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    filePath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["uploading", "reading", "indexing", "ready", "error"],
      default: "uploading",
    },
    errorMessage: {
      type: String,
      default: null,
    },
    chunks: [chunkSchema],
  },
  { timestamps: true },
);

export const Document = mongoose.model("Document", documentSchema);