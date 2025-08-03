import { Click } from "@/models/clickModel/click";
import { Url } from "@/models/urlModel/Url";
import { NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  { params }: { params: { _id: number } }
) {
  try {
    const url_id = await params._id; // request url id

    const rawDate = new URL(req.url).searchParams.get("day");
    const date = parseInt(rawDate || "7");
    const startDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * date); // to get data of specific time range
    const endDate = new Date(Date.now());

    const url = await Url.findById({ _id: url_id }).select("_id");

    const clicks = await Click.aggregate([
      {
        $match: { url: url._id, timestamp: { $gte: startDate, $lte: endDate } },
      },
      {
        $facet: {
          totalClicks: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
          country: [
            {
              $group: {
                _id: "$country",
                count: { $sum: 1 },
              },
            },
          ],
          devices: [
            {
              $group: {
                _id: "$device",
                count: { $sum: 1 },
              },
            },
          ],
          userAgent: [
            {
              $group: {
                _id: "$userAgent",
                count: { $sum: 1 },
              },
            },
          ],
           clicksToday: [
            {
              $match: {
                timestamp: {
                  $gte: new Date(new Date().setHours(0, 0, 0, 0)), 
                  $lte: new Date(), 
                },
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    console.log("clicks data totalclicks=>", clicks[0].totalClicks);
    console.log("clicks data country=>", clicks[0].country);
    console.log("clicks data agent =>", clicks[0].userAgent);
    console.log("clicks data devices =>", clicks[0].devices);
    console.log("clicks data clicks today =>", clicks[0].devices);
    return NextResponse.json({ clicks });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error while fecthing single id analayticd", error.message);
    } else {
      console.error("error while fecthing single id analayticd", error);
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
