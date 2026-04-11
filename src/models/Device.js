import mongoose from "mongoose";

const VALID_PINS = [23, 22, 19, 18]; //pinos do esp32 utilizados

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pin: { type: Number, required: true, enum: VALID_PINS },
    status: { type: Boolean, default: false }
},
    {
        versionKey: false
    });

// 🔒 índice único para name
deviceSchema.index({ name: 1 }, { unique: true });

// 🔒 índice único para pin (mantém também!)
deviceSchema.index({ pin: 1 }, { unique: true });

export default mongoose.model("Device", deviceSchema);