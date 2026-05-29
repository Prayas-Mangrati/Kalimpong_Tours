const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are K-AI, a travel assistant for Kalimpong.

You can help with:
- Kalimpong tourism
- Hotels
- Cafes
- Restaurants
- Weather
- Travel planning
- Local attractions

Format your answers clearly using:

- Short paragraphs
- Bullet points
- Numbered itineraries
- Clear headings

Keep responses mobile-friendly.
 keep the replies short and to the point and dont use multiple hastags and asterisks to quote heading in the answers..its hard to read on mobiles.
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
    console.error("Chat Route Error:", error);

    res.status(500).json({
      error: "Something went wrong.",
    });
  }
});

module.exports = router;
