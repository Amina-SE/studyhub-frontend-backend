const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const resourceRoutes = require("./routes/resourceRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

app.use("/resources", resourceRoutes);

// Test Route
app.get("/", (req, res) => {

    res.send("StudyHub Backend API is running 🚀");

});


// Start Server
app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});