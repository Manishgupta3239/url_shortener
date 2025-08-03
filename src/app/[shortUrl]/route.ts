import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/lib/connection";
import { Url } from "@/models/urlModel/Url";
import { getCountry } from "@/lib/getCountry";
import { Click } from "@/models/clickModel/click";
import { UAParser } from "ua-parser-js";

export async function GET(req: NextRequest,{ params }: { params: { shortUrl: string } }) {
  await ConnectDb();

  const { shortUrl } = params;
  try{
    const document = await Url.findOneAndUpdate({ shortUrl: `http://localhost:3000/${shortUrl}` },{ $inc: { clicks: 1 } },{ new: true });
    const currentDate = new Date();
    if (!document) {
    return NextResponse.json({ message: "Invalid URL" }, { status: 404 });
    }
    if(document.expiry < currentDate) {
      return NextResponse.json({message : "link expired"});
    }
    // get ip address
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0] || "Unknown"; 

    // get referer
    const referer = req.headers.get("referer") || "Direct";

    // get country
    const country  = await getCountry(ip); 

    // device
    const userAgent = req.headers.get("user-agent") || "Unknown"; // user agent
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    const device = result.device.type || "desktop"

    // storing info
    await Click.create({url : document._id ,device, userAgent : referer , country });

  return NextResponse.redirect(document.longUrl);

  }catch(error : unknown){
      if(error instanceof Error){
        console.error("redirect handler failed",error.message)
      }else{
        console.error("error in redirect handler",error);
      }
       return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
  
}