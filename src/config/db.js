import mongoose from "mongoose";

async function conectaNaDatabase(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Banco conectado!");
    return mongoose.connection;
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}
export default conectaNaDatabase;