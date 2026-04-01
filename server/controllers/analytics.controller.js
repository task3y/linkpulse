import Click from "../models/Click.model.js";
import Link from "../models/Link.model.js";

const getLinkAnalytics = async (req, res) => {
  try {
    const { slug } = req.params;

    const link = await Link.findOne({ slug, userId: req.user.id });
    if (!link) return res.status(404).json({ message: "Link not found" });

    const last7Days = await Click.aggregate([
      { $match: { linkId: link._id } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          clicks: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 7 },
    ]);

    const devices = await Click.aggregate([
      { $match: { linkId: link._id } },
      { $group: { _id: "$device", count: { $sum: 1 } } },
    ]);

    const browsers = await Click.aggregate([
      { $match: { linkId: link._id } },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const countries = await Click.aggregate([
      { $match: { linkId: link._id } },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const referrers = await Click.aggregate([
      { $match: { linkId: link._id } },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      link,
      totalClicks: link.totalClicks,
      last7Days: last7Days.map((d) => ({ date: d._id, clicks: d.clicks })),
      devices: devices.map((d) => ({ name: d._id, value: d.count })),
      browsers: browsers.map((b) => ({ name: b._id, value: b.count })),
      countries: countries.map((c) => ({ name: c._id, value: c.count })),
      referrers: referrers.map((r) => ({ name: r._id, value: r.count })),
    });
  } catch (error) {
    console.error("ANALYTICS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default getLinkAnalytics;
