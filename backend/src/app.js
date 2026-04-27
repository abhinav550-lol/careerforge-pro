import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

// Import Routers
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";

// Load Environment Variables
config();

const app = express();

// --- 1. GLOBAL MIDDLEWARE ---

// Security & Cross-Origin Resource Sharing
const corsOptions = {
    origin: process.env.ALLOWED_SITE || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Parsing Middlewares
app.use(express.json({ limit: "16kb" })); // Protection against large payloads
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// --- 2. API ROUTES ---

/**
 * Health Check Route
 * Useful for monitoring and confirming server status
 */
app.get("/health", (req, res) => {
    res.status(200).json({ status: "success", message: "Server is healthy" });
});

/**
 * Main Application Routes
 * Prefixing with /api ensures a clean API structure
 */
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

// --- 3. ERROR HANDLING ---

/**
 * 404 Not Found Middleware
 * Catches any request that doesn't match the routes above
 */
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

/**
 * Global Error Handler
 * This prevents the server from leaking sensitive stack traces in production
 */
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    console.error(`[ERROR] ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        // Only show stack trace if not in production
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
});

export default app;