import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    plan: {
      type: String,
      enum: ["Free", "Pro"],
      default: "Free",
    },
    credits:{
        type : Number,
        default : 15,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);