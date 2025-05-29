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
      enum: ["free", "pro"],
      default: "free",
    },
    credits:{
        type : Number,
        default : 10,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);