import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { UploadFileResponse } from "@google/generative-ai/dist/server/server";

export const imageProcessing = async (
  uploadResponse: UploadFileResponse,
  measure_type: string
) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const parts = [
    {
      text: `Retorne a leitura individualizada de consumo de ${
        measure_type === "WATER" ? "água" : "gás"
      } dependendo da imagem eviada. Retorne apenas o valor numérico correspondente a leitura.`,
    },
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
  ];

  const generationConfig = {
    temperature: 0,
    responseMimeType: "text/plain",
  };

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
  });

  const measure_value = result.response.text();

  return { measure_value };
};
