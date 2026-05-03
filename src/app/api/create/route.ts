import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import ConnectDb from "@/lib/connection";
import { Url } from "@/models/urlModel/Url";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { User } from "@/models/UserModel/user";

export async function POST(req: NextRequest) {
    try {
        await ConnectDb();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "kindly login" }, { status: 401 });
        }
        const { user } = session
        const result = await User.findOne({ _id: user._id });
        // if limit crossed
        if (result.credits == 0 || result.plan == 'free') {
            return NextResponse.json({ message: "Limit crossed" }, { status: 403 })
        }
        const { longUrl , customDomain } = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const domain = customDomain ? `${customDomain}` : `${nanoid(6)}`
        const urlExists = await Url.findOne({shortUrl : domain});
        console.log("url exjits",urlExists);
        if(urlExists){
            console.log("url already exists")
            return NextResponse.json({message:"Url already exists"}, {status:400});
        }
        const shortUrl = `${baseUrl}/${domain}`
        const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
        const newUrl = await Url.create({ longUrl, shortUrl:domain, createdBy: user._id, expiry });
        const document = await User.findOneAndUpdate(
            { _id: user._id },
            { $inc: { credits: -1 } },
            { new: true }
        );
        if (!newUrl || !document) {
            return NextResponse.json({ message: "shortUrl not created" }, { status: 500 })
        }
        return NextResponse.json({ message: "shortUrl created", shortUrl }, { status: 201 });
    } catch (error) {
        console.log("error in createUrl route", error);
        return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }

}