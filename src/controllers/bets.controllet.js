import { betModel } from "../models/bet.model.js";
import { rouletteModel } from "../models/roulette.model.js";

// Crear apuesta
export const postBet = async (request, response) => {
    const amountMax = 10000;
    const numberMin = 0;
    const numberMax = 36;

    const rouletteId = request.params.id;
    const betsArray = request.body;

    const roulette = await rouletteModel.findById(rouletteId);
    if (!roulette || roulette.status !== "ABIERTA") {
        return response.status(403).json({
            "msessage": "La ruleta no existe o no está abierta"
        });
    }

    const validBets = [];
    const errors = [];

    for (const bet of betsArray) {
        const { typeBet, valueBet, amountBet } = bet;
        let isValid = true;

        if (amountBet <= 0 || amountBet > amountMax) {
            errors.push({
                "error": `Monto inválido. El monto debe ser mayor que ${amountMax}`
            });
            isValid = false;
        }
        if (typeBet === "NUMERO") {
            const numberBet = parseInt(valueBet);

            if (isNaN(numberBet) || numberBet < numberMin || numberBet > numberMax) {
                errors.push({
                    "error": `Número fuera del rango. El número apostado (${numberBet}) debe estar entre ${numberMin} y ${numberMax}.`
                });
                isValid = false;
            }
        } else if (typeBet === "COLOR") {
            if (valueBet !== "ROJO" && valueBet !== "NEGRO") {
                errors.push({
                    "error": `El color ${valueBet} no es valido. El color apostado deber ser "ROJO" o "NEGRO".`
                });
                isValid = false;
            }
        } else {
            errors.push({
                "error": "El tipo de apuesta es inválido, solo se permite apuesta de tipo NUMERO o COLOR."
            });
            isValid = false;
        }

        if (isValid) {
            validBets.push(bet);
        }
    }
    if (errors.length > 0) {
        return response.status(400).json({
            "message": "Una o más apuestas no cumplen con las reglas.",
            "errors": errors
        });
    }
    try {
        const betsToSave = validBets.map(bet => ({
            ...bet,
            rouletteId: rouletteId,
            status: "PENDIENTE"
        }));

        await betModel.insertMany(betsToSave);

        return response.status(201).json({
            "message": `Se registrarón ${betsToSave.length} apuestas con éxito.`
        });
    } catch (error) {
        return response.status(400).json({
            "message": "Ha ocurrido un error al crear las apuestas, intente de nuevo.",
            "error": error.message || error
        });
    }
}

// Obtener el resultado de las apuestas
export const getAllBets = async (request, response) => {
    try {
        const allBets = await betModel.find();
        return response.status(200).json({
            "message": "Estas son todas tus apuestas:",
            "data": allBets
        });
    } catch (error) {
        return response.status(500).json({
            "message": "Ocurrió un error al mostrar tus apuestas, vuelve a intentarlo.",
            "error": error.message || error
        });
    }
}