import express from "express";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes.js";
import conectaNaDatabase from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

await conectaNaDatabase();

app.use("/devices", deviceRoutes);

export default app;