import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT: string = process.env.PORT ?? "80";

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
