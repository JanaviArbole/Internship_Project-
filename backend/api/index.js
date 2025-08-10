// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// require("dotenv").config();
// require("../Models/db"); // MongoDB connection

// const AuthRouter = require("../Routes/AuthRouter");
// const ProductRouter = require("../Routes/ProductRouter");

// const app = express();

// app.use(bodyParser.json());

// app.use(cors({
//   origin: [
//     "http://localhost:3000", 
//     "https://signup-page-frontend.vercel.app" // Replace with your real Vercel frontend URL
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.get("/ping", (req, res) => res.send("PONG"));

// app.use("/auth", AuthRouter);
// app.use("/products", ProductRouter);

// // ❌ No app.listen() for Vercel
// module.exports = app;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
require("../Models/db"); // MongoDB connection

const AuthRouter = require("../Routes/AuthRouter");
const ProductRouter = require("../Routes/ProductRouter");

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://signup-page-frontend.vercel.app" // your frontend URL on Vercel
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Test route
app.get("/ping", (req, res) => res.send("PONG"));

// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

/**
 * ✅ Universal Mode:
 *  - Local: starts server with app.listen
 *  - Vercel: exports app (serverless)
 */
if (process.env.NODE_ENV !== "vercel") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else {
  module.exports = app;
}