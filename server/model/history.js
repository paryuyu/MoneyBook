import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    content: { type: String, required: true },
    type: String,
    place: String,
    money: Number,
    pattern: String,
    date: Date,
    category: String,
    userEmail: String
});

export default mongoose.model("history", historySchema);