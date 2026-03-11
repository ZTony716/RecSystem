const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const eventRoutes = require("./routes/eventRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});