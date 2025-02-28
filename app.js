const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectToDb");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler, notFound } = require("./middlewares/error");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

// Connection To Db
connectDB();

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://estinup.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};


app.use(cors(corsOptions)); // Apply CORS middleware before other middleware

// Security Headers (helmet)
app.use(helmet());

// Prevent Http Param Pollution
app.use(hpp());

// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());

// Rate Limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));


// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
