import ConnectDb from "@/lib/connection";
import { User } from "@/models/UserModel/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
    const _id = req.headers.get("_id"); // logged in user id
  try {
    await ConnectDb();
    const user = await User.findOne({_id});
    console.log(user);
    return NextResponse.json({user});
  } catch (error) {
     console.log(error)
     return NextResponse.json({message : "error in profile"},{status:500});
  }
}
