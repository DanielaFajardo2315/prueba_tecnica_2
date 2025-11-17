import mongoose from "mongoose";

const rouletteSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    closeDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export const rouletteModel = mongoose.model("roulette", rouletteSchema);