import { User } from "@/models/UserModel/user";
import { Url } from "@/models/urlModel/Url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawPage = searchParams.get("page");
    const page = parseInt(rawPage || "1", 10);
    const rawLimit = searchParams.get("limit");
    const limit = parseInt(rawLimit || "4", 10);
    const skip = (page - 1) * limit;
    const _id = req.headers.get("_id");
    const urls = await Url.find({ createdBy: _id }).sort({createdAt : -1}).skip(skip).limit(limit)
    const total = await Url.find({createdBy: _id}).countDocuments();
    const user = await User.findOne({ _id }); // fecthes user data to read the updated credits details

    return NextResponse.json({ message: "done", urls, credits: user.credits ,total});
  } catch (error) {
    console.log("error in get urls route", error);
  }
}
