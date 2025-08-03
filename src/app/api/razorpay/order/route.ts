import { razorpayInstance } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log(order)
    return NextResponse.json(order);

  }catch (error) {
    
    console.error("Order creation failed:", error);
    return new Response(JSON.stringify({ error: "Order creation failed" }), {
      status: 500,
    });
  }
}
