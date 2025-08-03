import mongoose, { Schema } from "mongoose";


const clickSchema = new Schema({
  url: { type: mongoose.Schema.Types.ObjectId, ref: "Url" },
  device: String,
  country : String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});


export const Click = mongoose.models.Click || mongoose.model("Click", clickSchema);