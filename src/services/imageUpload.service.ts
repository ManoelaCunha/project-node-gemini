import "dotenv/config";
import fs from "fs";

import { GoogleAIFileManager } from "@google/generative-ai/server";

export const imageUpload = async (tempFilePath: string, mimeType: string) => {
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);

  const uploadResponse = await fileManager.uploadFile(tempFilePath, {
    mimeType,
    displayName: tempFilePath,
  });

  // Exclui o arquivo temporário
  fs.unlinkSync(tempFilePath);

  return uploadResponse;
};
