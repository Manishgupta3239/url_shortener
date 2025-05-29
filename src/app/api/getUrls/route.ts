import { Url } from "@/models/urlModel/Url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest ){
    try{
        const _id = req.headers.get("_id");
        const urls  = await Url.find({createdBy : _id})

        return NextResponse.json({message : "done" , urls });
    }catch(error){
        console.log("error in get urls route",error)
    }
}