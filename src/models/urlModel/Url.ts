import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      index:true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, 
    },
    expiry:{
      type: Date
    }
  },
  { timestamps: true }
);

export const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);