import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { conectMongo } from "./src/config/db.js";
import { rouletteRouter } from "./src/routes/roulettes.routes.js";
import { betRouter } from "./src/routes/bets.routes.js";

const app = express();
dotenv.config();

const port = process.env.PORT;
conectMongo();

app.get("/", (req, res) => {
    res.send("El servidor está activo")
});

app.use(cors());
app.use(express.json());
app.use("/ruletas", rouletteRouter);
app.use("/apuestas", betRouter);

app.listen(port, () => {
    console.log(`El servidor está activo en el puerto http://localhost:${port}`);
});