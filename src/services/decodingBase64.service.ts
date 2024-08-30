import fileType from "file-type";
import fs from "fs";

export const decodingBase64 = async (image: string) => {
  // Decodifica a string base64
  const imageBuffer = Buffer.from(image, "base64");

  // Detecta o MIME type
  const type = await fileType.fromBuffer(imageBuffer);

  // Gera um nome de arquivo único
  const fileName = `image_${Date.now()}.${type?.ext}`;

  // Cria o arquivo temporário
  const tempFilePath = "/tmp/" + fileName;
  fs.writeFileSync(tempFilePath, imageBuffer);

  return { type, tempFilePath };
};
