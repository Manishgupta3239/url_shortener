import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import ConnectDb from "@/lib/connection";
import { Url } from "@/models/urlModel/Url";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@/models/UserModel/user";

export async function POST(req: NextRequest){
    try{
        await ConnectDb();
        const session = await getServerSession(authOptions);
        if( !session){
            return NextResponse.json({message:"kindly login"},{status:401});
        }
        const {user} = session
        const body = await req.json();
        const {longUrl} = body;
        const created = nanoid(6);
        const shortUrl = `http://localhost:3000/${created}`
        const expiry = new Date(Date.now() + 1000*60*60*24*7);
        const newUrl = await Url.create({longUrl , shortUrl , createdBy : user._id , expiry});
        const document = await User.findOneAndUpdate(
            { _id: user._id },
            { $inc: { credits: -1 } },
            { new: true }
          );
        if(! newUrl || ! document){
            return NextResponse.json({message: "shortUrl not created"} , {status:500} )
        }
        return NextResponse.json({message: "shortUrl created" , shortUrl} , {status:200});
    }catch(error){
        console.log("error in createUrl route", error);
        return NextResponse.json({message:"internal server error"},{status: 500});
    }
   
}