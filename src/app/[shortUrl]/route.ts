// ✅ src/app/[shortUrl]/route.ts
import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/lib/connection";
import { Url } from "@/models/urlModel/Url";

export async function GET(req: NextRequest,{ params }: { params: { shortUrl: string } }) {
  await ConnectDb();

  const { shortUrl } = params;

  const document = await Url.findOneAndUpdate(
    { shortUrl: `http://localhost:3000/${shortUrl}` },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!document) {
    return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
  }

  return NextResponse.redirect(document.longUrl);
}

