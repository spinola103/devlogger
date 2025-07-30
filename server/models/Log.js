import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  tags: [String],
  mood: String,
  productivity: Number,
}, { timestamps: true });

export default mongoose.model("Log", logSchema);
