require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

if (!mongoUrl) {
  throw new Error("MONGO_URL is not defined");
}

main()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

async function main() {
  await mongoose.connect(mongoUrl);
}

const placeRoutes = require("./routes/placeRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use("/places", placeRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Server running..");
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
