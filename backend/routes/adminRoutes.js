const express = require("express");
const router = express.Router();
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig");
const upload = multer({ storage });
const Place = require("../models/place");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({
      success: true,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
});

router.post("/add-place", upload.single("img"), async (req, res) => {
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

      longitude: req.body.longitude === "" ? null : Number(req.body.longitude),
      img: {
        url: req.file.path,
        filename: req.file.filename,
      },
    });

    await newPlace.save();

    res.json({
      success: true,
      message: "Place added successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to add place",
    });
  }
});

router.delete("/place/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    await cloudinary.uploader.destroy(place.img.filename);
    await Place.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Place deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});
router.get("/place/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (place) {
    res.json(place);
  }
});
router.put("/place/:id", upload.single("img"), async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    const updatePayload = {
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      full_description: req.body.full_description,
      price: req.body.price,
      latitude: req.body.latitude === "" ? null : Number(req.body.latitude),

      longitude: req.body.longitude === "" ? null : Number(req.body.longitude),
    };

    if (req.file) {
      // Delete old image from Cloudinary
      if (place?.img?.filename) {
        await cloudinary.uploader.destroy(place.img.filename);
      }

      // Save new image
      updatePayload.img = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await Place.findByIdAndUpdate(req.params.id, updatePayload, { new: true });

    res.json({
      success: true,
      message: "Place updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to update place",
    });
  }
});
router.post("/fetch-coordinates", async (req, res) => {
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
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch coordinates",
    });
  }
});

module.exports = router;
