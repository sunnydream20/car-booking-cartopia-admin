require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const carRoutes = require("./routes/car");
const detailRoutes = require("./routes/detail");
const homeSliderRoutes = require("./routes/homeslider");
const homeBannerRoutes = require("./routes/homebanner");
const homeAdditionRoutes = require("./routes/homeaddition");
const articleRoutes = require("./routes/article");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/car", carRoutes);
app.use("/api/detail", detailRoutes);
app.use("/api/homesliders", homeSliderRoutes);
app.use("/api/homebanners", homeBannerRoutes);
app.use("/api/homeadditions", homeAdditionRoutes);
app.use("/api/articles", articleRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
