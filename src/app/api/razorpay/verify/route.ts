import { User } from '@/models/UserModel/user';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const _id = req.headers.get("_id"); // logged in user id
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Optional: You can save payment info to DB here
      const user = await User.findOneAndUpdate({_id},{plan : "Pro"}, {new : true});
      console.log(user)
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false });
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
