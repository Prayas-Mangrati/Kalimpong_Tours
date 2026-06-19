const verifyToken = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig");
const upload = multer({ storage });
const Place = require("../models/place");
const AdminStats = require("../models/adminStats");
const Activity = require("../models/activity");
const jwt = require("jsonwebtoken");

const getAdminStats = async () => {
  let stats = await AdminStats.findOne();
  if (!stats) {
    stats = await AdminStats.create({});
  }
  return stats;
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      {
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    return res.json({
      success: true,
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Credentials",
  });
});

router.post(
  "/add-place",
  verifyToken,
  upload.single("img"),
  async (req, res) => {
    try {
      const newPlace = new Place({
        title: req.body.title,
        type:
          req.body.type.toLowerCase() === "tourist attraction"
            ? "tourist"
            : req.body.type.toLowerCase(),
        location: "kalimpong, West Bengal,India",
        description: req.body.description,
        full_description: req.body.full_description,
        price: req.body.price,
        latitude: req.body.latitude === "" ? null : Number(req.body.latitude),

        longitude:
          req.body.longitude === "" ? null : Number(req.body.longitude),
        img: {
          url: req.file.path,
          filename: req.file.filename,
        },
      });

      await newPlace.save();
      await Activity.create({
        action: "added",
        title: newPlace.title,
      });
      const stats = await getAdminStats();
      stats.added++;
      await stats.save();

      res.json({
        success: true,
        message: "Place added successfully",
      });
    } catch (err) {

      res.status(500).json({
        success: false,
        message: "Failed to add place",
      });
    }
  },
);

router.delete("/place/:id", verifyToken, async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found",
      });
    }

    if (place.img?.filename) {
      await cloudinary.uploader.destroy(place.img.filename);
    }

    await Place.findByIdAndDelete(req.params.id);

    const stats = await getAdminStats();

    await Activity.create({
      action: "deleted",
      title: place.title,
    });

    stats.deleted++;
    await stats.save();

    res.json({
      success: true,
      message: "Place deleted successfully",
    });
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});
router.get("/place/:id", verifyToken, async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (place) {
    res.json(place);
  }
});
router.put(
  "/place/:id",
  verifyToken,
  upload.single("img"),
  async (req, res) => {
    try {
      const place = await Place.findById(req.params.id);
      const updatePayload = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        full_description: req.body.full_description,
        price: req.body.price,
        latitude: req.body.latitude === "" ? null : Number(req.body.latitude),

        longitude:
          req.body.longitude === "" ? null : Number(req.body.longitude),
      };

      if (req.file) {
        if (place?.img?.filename) {
          await cloudinary.uploader.destroy(place.img.filename);
        }


        updatePayload.img = {
          url: req.file.path,
          filename: req.file.filename,
        };
      }

      await Place.findByIdAndUpdate(req.params.id, updatePayload, {
        new: true,
      });
      await Activity.create({
        action: "edited",
        title: place.title,
      });
      const stats = await getAdminStats();
      stats.edited++;
      await stats.save();

      res.json({
        success: true,
        message: "Place updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to update place",
      });
    }
  },
);
router.post("/fetch-coordinates", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const query = `${title}, Kalimpong, West Bengal, India`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      {
        headers: {
          "User-Agent": "KPG-AI-Travel-Planner",
        },
      },
    );

    const data = await response.json();

    if (data.length === 0) {
      return res.json({
        success: false,
        message: "Couldn't fetch coordinates",
      });
    }

    res.json({
      success: true,
      latitude: Number(data[0].lat),
      longitude: Number(data[0].lon),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch coordinates",
    });
  }
});

router.get("/dashboard/stats", verifyToken, async (req, res) => {
  try {
    const tourist = await Place.countDocuments({ type: "tourist" });
    const hotel = await Place.countDocuments({ type: "hotel" });
    const homestay = await Place.countDocuments({ type: "homestay" });

    const totalPlaces = await Place.countDocuments();
    res.json({
      success: true,
      data: {
        tourist,
        hotel,
        homestay,
        totalPlaces,
      },
    });
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
});

router.get("/dashboard/admin-actions", verifyToken, async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin actions",
    });
  }
});
router.get("/dashboard/recent-activity", verifyToken, async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(3);

    res.json({
      success: true,
      data: activities,
    });
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity",
    });
  }
});
module.exports = router;
