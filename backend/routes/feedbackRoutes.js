const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    const feedback = await Feedback.create({
      name,
      message,
      rating,
    });

    res.json({
      success: true,
      data: feedback,
    });
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: feedbacks,
    });
  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
    });
  }
});

module.exports = router;