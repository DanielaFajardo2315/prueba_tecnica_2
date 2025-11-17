import mongoose from "mongoose";

const rouletteSchema = new mongoose.Schema({
    number: {
        type: Number | null,
    },
    color: {
        type: String | null,
    },
    status: {
        type: Boolean,
        required: true,
        enum: ["ABIERTA", "CERRADA"],
        default: "CERRADA"
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    closeDate: {
        type: Date,
    }
});

export const rouletteModel = mongoose.model("roulette", rouletteSchema);