import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
    rouletteId: {
        type: String,
        required: true
    },
    amountBet: { //cantidad monetaria apostada
        type: Number,
        required: true
    },
    typeBet: {
        type: String,
        required: true,
        enum: ["NUMERO", "COLOR"]
    },
    valueBet: { //número o color apostado
        type: String,
        required: true
    },
    winnings: {
        type: Number
    },
    status: {
        type: String,
        enum: ["PENDIENTE", "GANADA", "PERDIDA"],
        default: "PENDIENTE"
    },
    betDate: {
        type: Date,
        default: Date.now
    }
});

export const betModel = mongoose.model("bet", betSchema);