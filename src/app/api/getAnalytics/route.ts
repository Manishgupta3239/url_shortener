import { Click } from "@/models/clickModel/click";
import { Url } from "@/models/urlModel/Url";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const _id = req.headers.get("_id"); // logged in user id

    const urls = await Url.find({ createdBy: _id }).select("_id");
    const rawDate = new URL(req.url).searchParams.get("day");
    const date = parseInt(rawDate || "7");
    const raw = new Date(Date.now() - 1000 * 60 * 60 * 24 * date); // n days ago
    raw.setHours(0, 0, 0, 0); // us din ka 12:00 AM
    
    const startDate = raw;
    const endDate = new Date(Date.now());
    const urlId = urls.map((url) => url._id);
    console.log(endDate);
    const clicks = await Click.aggregate([
      {
        $match: {
          url: { $in: urlId },
          timestamp: { $gte: startDate, $lte: endDate },
        },
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

    console.log("overall data totalclicks=>", clicks[0].totalClicks);
    console.log("overall data country=>", clicks[0].country);
    console.log("overall data agent =>", clicks[0].userAgent);
    console.log("overall data devices =>", clicks[0].devices);
    console.log("overall data clicks today =>", clicks[0].clicksToday);
    return NextResponse.json({ clicks });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error while fecthing clicks data", error.message);
    } else {
      console.error("error while fecthing clicks data", error);
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
