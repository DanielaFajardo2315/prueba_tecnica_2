import express from "express";
import { postBet, getAllBets } from "../controllers/bets.controllet.js";

export const betRouter = express.Router();

// POST
betRouter.post("/", postBet);
// GET
betRouter.get("/", getAllBets);