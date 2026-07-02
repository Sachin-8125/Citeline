import { useState, useCallback } from "react";
import { useAuth } from "../context/useAuth";

const UploadStatus = {
  IDLE: "idle",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
};

export function useFileUpload(setMessages, setDocuments, setActiveDocument) {
  const { accessToken } = useAuth();

  const [uploadStatus, setUploadStatus] = useState(UploadStatus.IDLE);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadedFile(file);
      setUploadStatus(UploadStatus.UPLOADING);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/documents/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || `Upload failed (${response.status})`
          );
        }

        const data = await response.json();

        setUploadStatus(UploadStatus.SUCCESS);

        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            content: `Uploaded "${file.name}" successfully. You can now ask questions about it.`,
            timestamp: new Date().toISOString(),
          },
        ]);

        setDocuments((prev) => [data.document, ...prev]);
        setActiveDocument(data.document);

        e.target.value = "";
      } catch (error) {
        setUploadStatus(UploadStatus.ERROR);
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            content: `Upload failed: ${error.message}`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    },
    [accessToken, setMessages, setDocuments, setActiveDocument]
  );

  return {
    uploadStatus,
    uploadedFile,
    handleFileUpload,
    UploadStatus,
  };
}