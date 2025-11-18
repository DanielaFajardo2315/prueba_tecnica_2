import { betModel } from "../models/bet.model.js";
import { rouletteModel } from "../models/roulette.model.js";

// Creación de la ruleta
export const postRoulette = async (request, response) => {
    try {
        const newRoulette = await rouletteModel.create({
            number: null,
            color: null,
            status: "CERRADA",
            creationDate: new Date()
        });

        return response.status(201).json({
            "message": "Ruleta creada con éxito.",
            "rouletteId": newRoulette._id
        });
    } catch (error) {
        return response.status(400).json({
            "message": "La ruleta no a podido ser creada, intente de nuevo.",
            "error": error.message || error
        });
    }
}

// Lista de ruletas
export const getAllRoulettes = async (request, response) => {
    try {
        const allRoulettes = await rouletteModel.find();
        return response.status(200).json({
            "message": "Ruletas encontradas",
            "data": allRoulettes
        });
    } catch (error) {
        return response.status(500).json({
            "message": "Ocurrió un error al mostrar las ruletas",
            "error": error.message || error
        });
    }
}

// Lista de ruletas abiertas
export const getRoulettesByStatus = async (request, response) => {
    try {
        const rouletteStatus = "ABIERTA";
        const roulettesOpen = await rouletteModel.find({ status: { $in: [rouletteStatus] } });
        if (roulettesOpen.length === 0) {
            return response.status(404).json({
                "message": "No hay ruletas abiertas en este momento."
            });
        }

        return response.status(200).json({
            "message": `Hay ${roulettesOpen.length} ruletas abiertas.`,
            "data": roulettesOpen
        });
    } catch (error) {
        return response.status(500).json({
            "message": "Ocurrió un error al mostrar las ruletas",
            "error": error.message || error
        });
    }
}

// Abrir la ruleta
export const openRouletteById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;
        const openRoulette = await rouletteModel.findOneAndUpdate(
            {
                _id: idForUpdate,
                status: "CERRADA"
            },
            {
                status: "ABIERTA",
            },
            { new: true }
        );
        if (!openRoulette) {
            const existRoulette = await rouletteModel.findById(idForUpdate);

            if (!existRoulette) {
                return response.status(404).json({
                    "message": "La ruleta no se ha encontrado, verifique el ID de la ruleta."
                });
            }
            return response.status(409).json({
                "message": "La ruleta ya estaba ABIERTA.",
                "roulette": openRoulette
            });
        }
        return response.status(200).json({
            "message": "Ruleta abierta exitosamente, lista para recibir apuestas.",
            "status": openRoulette.status
        });
    } catch (error) {
        return response.status(500).json({
            "message": "Ocurrió un error al abrir la ruleta deseada, intente de nuevo",
            "error": error.message || error
        });
    }
}

// Cerrar la ruleta
export const closeRouletteById = async (request, response) => {
    try {
        // Logica para generar el numero y color ganador
        const generateWinningNumber = () => {
            return Math.floor(Math.random() * 37);
        }
        const determineWinningColor = (number) => {
            if (number === 0) {
                return "VERDE";
            }
            if (number % 2 === 0) {
                return "ROJO";
            }
            return "NEGRO";
        }
        const payNumber = 5;
        const payColor = 1.8;

        const idForUpdate = request.params.id;
        const winningNumber = generateWinningNumber();
        const winningColor = determineWinningColor(winningNumber);
        const colorForPayout = (winningNumber === 0) ? null : winningColor;
        const closeRoulette = await rouletteModel.findOneAndUpdate(
            {
                _id: idForUpdate,
                status: "ABIERTA"
            },
            {
                status: "CERRADA",
                number: winningNumber,
                color: colorForPayout,
                closeDate: Date.now()
            },
            { new: true }
        );
        if (!closeRoulette) {
            const existRoulette = await rouletteModel.findById(idForUpdate);

            if (!existRoulette) {
                return response.status(404).json({
                    "message": "La ruleta no se ha encontrado, verifique el ID de la ruleta."
                });
            }
            return response.status(409).json({
                "message": "La ruleta ya estaba CERRADA.",
                "roulette": closeRoulette
            });
        }
        const pendingBets = await betModel.find({
            rouletteId: idForUpdate,
            status: "PENDIENTE"
        });

        const betsResults = [];

        for (const bet of pendingBets) {
            let winning = 0;
            let status = "PERDIDA";
            const amountBet = bet.amountBet;

            if (bet.typeBet === "NUMERO") {
                if (parseInt(bet.valueBet) === winningNumber) {
                    winning = amountBet * (payNumber + 1);
                    status = "GANADA";
                }
            } else if (bet.typeBet === "COLOR") {
                if (bet.valueBet === colorForPayout) {
                    winning = amountBet * (payColor + 1);
                    status = "GANADA";
                }
            }
            await betModel.updateOne(
                { _id: bet._id },
                { status: status, winnings: winning }
            );
            betsResults.push({
                betId: bet._id,
                type: bet.typeBet,
                amount: amountBet,
                status: status,
                winning: winning
            });
        }
        return response.status(200).json({
            "message": "Ruleta cerrada exitosamente, listo para entregar las ganancias.",
            "status": closeRoulette.status,
            "winNumber": closeRoulette.number,
            "winColor": closeRoulette.color,
            "totalBets": betsResults.length,
            "resoults": betsResults
        });
    } catch (error) {
        return response.status(500).json({
            "message": "Ocurrió un error al abrir la ruleta deseada, intente de nuevo",
            "error": error.message || error
        });
    }
}