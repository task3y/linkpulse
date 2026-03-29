import Link from "../models/Link.model";
import Click from "../models/Click.model";
import nanoid from "nanoid";
import useragent from "useragent";
import {
  getCachedUrl,
  setCachedUrl,
  deleteCachedUrl,
} from "../services/redis.service";

const createLink = async (req, res) => {
  try {
    const { originalUrl, customSlug, title, expiresAt } = req.body;

    const user = req.user;
    if (user.plan == "Free") {
      const count = await Link.countDocuments({ userId: user.id });
      if (count >= 10) {
        return res
          .status(403)
          .json({ messsage: "Free plan limit reached. Upgrade to Pro" });
      }
    }
    let slug = customSlug || nanoid(6);

    const existing = await Link.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Slug already taken" });
    }

    const link = await Link.create({
      userId: user.id,
      originalUrl,
      slug,
      customSlug: customSlug || null,
      title: title || "",
      expiresAt: expiresAt || null,
    });

    await setCachedUrl(slug, originalUrl);

    res.status(201).json(link);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await Link.find(
      { userId: req.user.id }.sort({ created: -1 }),
    );
    return res.status(200).json(links);
  } catch (error) {
    return res.status(500).json({ message: " Server Error" });
  }
};

const deleteLink = async (req, res) => {
  try {
    const link = await Link.findOne({ id: req.params.id, userId: req.user.id });
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    await deleteCachedUrl(link.slug);
    await Click.deleteMany({ linkId: link._id });
    await link.deleteOne();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const toggleLink = async (req, res) => {
  try {
    const link = await Link.findOne({ id: req.params.id, userId: req.user.id });
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    link.isActive = !link.isActive;
    await link.save();

    if (link.isActive) {
      await setCachedUrl(link.slug, link.originalUrl);
    } else {
      await deleteCachedUrl(link.slug);
    }
    return res.status(200).json(link);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const redirectLink = async (req, res) => {
  try {
    const { slug } = req.params;

    let originalUrl = await getCachedUrl(slug);
    if (!originalUrl) {
      const link = await Link.findOne({ slug, isActive: true });
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }

      if (link.expiresAt && new Date() > link.expiresAt) {
        return res.status(410).json({ message: "Link expired" });
      }

      originalUrl = link.originalUrl;
      await setCachedUrl(slug, originalUrl);
    }

    trackClick(req, slug);

    res.redirect(originalUrl);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const trackClick = async (req, slug) => {
  try {
    const link = await Link.findOne({ slug });
    if (!link) return;

    const ua = useragent.parse(req.headers["user-agent"]);
    const ip = req.headers["x-forwarded-for"] || req.ip;

    let country = "Unknown",
      city = "Unknown";
    try {
      const geo = await fetch(`http://ip-api.com/json/${ip}`);
      const geoData = await geo.json();
      if (geoData.status === "success") {
        country = geoData.country;
        city = geoData.city;
      }
    } catch (_) {}

    let device = "desktop";
    if (ua.device.family !== "Other") device = "mobile";
    if (ua.device.family?.toLowerCase().includes("tablet")) device = "tablet";

    await Click.create({
      linkId: link._id,
      ip,
      country,
      city,
      device,
      browser: ua.family,
      os: ua.os.family,
      referrer: req.headers.referer || "Direct",
    });

    await Link.findByIdAndUpdate(link._id, { $inc: { totalClicks: 1 } });
  } catch (error) {
    console.error("Click tracking error:", error.message);
  }
};

export { createLink, getLinks, deleteLink, toggleLink, redirectLink };
