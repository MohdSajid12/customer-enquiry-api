const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const enquiryRoutes = require("./routes/enquiryRoutes");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

const enquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many enquiries. Please try again later."
    }
});


app.use("/api",enquiryLimiter,enquiryRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Customer Enquiry API is running"
    });
});

module.exports = app;