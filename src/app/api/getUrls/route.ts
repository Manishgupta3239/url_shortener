import ConnectDb from "@/lib/connection";
import { User } from "@/models/UserModel/user";
import { Url } from "@/models/urlModel/Url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ConnectDb();
    const { searchParams } = new URL(req.url);
    const rawPage = searchParams.get("page");
    const page = parseInt(rawPage || "1", 10);
    const rawLimit = searchParams.get("limit");
    const limit = parseInt(rawLimit || "4", 10);
    const filter = searchParams.get("filter");
    const skip = (page - 1) * limit;
    const _id = req.headers.get("_id");

    const baseQuery = { createdBy: _id };

    const activeFilter = {
      $or: [
        { expiry: null },
        { expiry: { $exists: false } },
        { expiry: { $gte: new Date() } }
      ]
    };

    const query =
      filter === "active"
        ? { ...baseQuery, ...activeFilter }
        : baseQuery;

    const urls = await Url.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
    const total = await Url.find(query).countDocuments();
    const user = await User.findOne({ _id }); // fecthes user data to read the updated credits details

    return NextResponse.json({ message: "done", urls, credits: user.credits, total });
  } catch (error) {
    console.log("error in get urls route", error);
  }
}
