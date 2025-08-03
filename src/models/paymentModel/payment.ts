import mongoose from "mongoose";

const paymentSchema  = new mongoose.Schema(
{
    orderId : String,
    paymentId : String,
    signature : String,
    status : String,
  
},
{timestamps : true});

export const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);