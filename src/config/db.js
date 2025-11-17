import mongoose from "mongoose";

export const conectMongo = async () => {
    try {
        await mongoose.connect(process.env.BD_URL, {dbName: "ruletaCasino"});
        console.log("Conexión exitosa con la base de datos");
    } catch (error) {
        console.error("Error de conexión con la base de datos: ", error);
    }
}