import express from "express";
import { postRoulette, getAllRoulettes, getRoulettesByStatus, openRouletteById, closeRouletteById } from "../controllers/roulettes.controller.js";

export const rouletteRouter = express.Router();
// POST
rouletteRouter.post("/", postRoulette);
// GET
rouletteRouter.get("/", getAllRoulettes);
rouletteRouter.get("/abiertas", getRoulettesByStatus);
// PUT
rouletteRouter.put("/abrir/:id", openRouletteById);
rouletteRouter.put("/cerrar/:id", closeRouletteById);