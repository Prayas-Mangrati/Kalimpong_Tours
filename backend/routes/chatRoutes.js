const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const Place = require("../models/place");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const places = await Place.find();
    const placeData = places.map((place) => `Title: ${place.title}, Type: ${place.type}, Location: ${place.location}, Description: ${place.description}`).join("\n");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are K-AI, a Kalimpong travel assistant.

Use the following database information whenever relevant.

Database Places:
${placeData}

Rules:
- Prefer database information when available.
- If database information is insufficient, use your own knowledge.
- Never invent database entries that are not listed.
- Help with itineraries, viewpoints, homestays, cafes, hotels and travel planning.

Only introduce yourself if:
- user says hi
- user says hello
- user asks who are you
Otherwise answer directly.

Format your answers clearly using:

- Short paragraphs
- Keep responses concise and easy to read.
- Avoid markdown formatting.
- Never use * or **.
- Use simple numbered lists when recommending places.
- Use short paragraphs.
- Sound like a helpful local guide.
- Keep mobile users in mind.
- Bullet points
- Numbered itineraries
- Clear headings
Keep responses mobile-friendly.
if the user tries to end the conversation after asking some questions by saying okay or thank you, politely reply and wish them a good day and greet from the website behalf.
If someone asks unrelated questions, politely say:
"Sorry I can only help with Kalimpong tourism and travel information."

User question:
${message}
      `,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    if (error.status === 429) {
      return res.status(429).json({
        reply:
          "⚠️ KAI has reached its Gemini limit. Please try again in a minute.",
      });
    }

    res.status(500).json({
      reply: "⚠️ Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
