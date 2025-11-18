import mongoose from "mongoose";

const rouletteSchema = new mongoose.Schema({
    number: {
        type: Number,
    },
    color: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ["ABIERTA", "CERRADA"],
        default: "CERRADA"
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    closeDate: {
        type: Date
    }
});

export const rouletteModel = mongoose.model("roulette", rouletteSchema);