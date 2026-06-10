const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");
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
      description: req.body.description,
      full_description: req.body.full_description,
      price: req.body.price,
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
    const updatePayload = {
      title: req.body.title,
      type: req.body.type,
      description: req.body.description,
      full_description: req.body.full_description,
      price: req.body.price,
    };

    if (req.file) {
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
module.exports = router;
