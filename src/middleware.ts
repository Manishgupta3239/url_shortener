import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req : NextRequest){

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const requestHeaders  = new Headers(req.headers)
  requestHeaders.set("_id",token._id as string);
  return NextResponse.next({
    headers : requestHeaders
  });
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/getUrls/:path*" , "/api/getAnalytics" ,"/api/razorpay/:path*" ,
  "/api/profile/:path*"],
};