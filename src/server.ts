import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT: string = process.env.PORT ?? "3000";

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
