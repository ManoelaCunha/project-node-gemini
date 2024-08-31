import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationErrorItem } from "joi";
import { ValidationError } from "../interfaces";

export const validateSchema =
  (schema: AnySchema) => (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const data = { ...body };

    if (body.image && typeof body.image === "string") {
      // Remove o prefixo "data:image\/\w+;base64," da imagem
      data.image = body.image.replace(/^data:image\/\w+;base64,/, "");
    }

    try {
      const { error, value } = schema.validate(data, {
        abortEarly: false, // Retorna todos os erros de validação encontrados
        stripUnknown: true, // Remove propriedades desconhecidas no schema
      });

      if (error) {
        const [badRequestError]: ValidationError[] = error.details.map(
          (detail: ValidationErrorItem) => ({
            error_code: "INVALID_DATA",
            error_description: detail.message,
          })
        );

        return res.status(400).json(badRequestError);
      }

      req.body = value;

      return next();
    } catch (error: any) {
      const internalServerError: ValidationError = {
        error_code: "SERVER_ERROR",
        error_description: error.message || "Internal Server Error",
      };

      return res.status(500).json(internalServerError);
    }
  };
