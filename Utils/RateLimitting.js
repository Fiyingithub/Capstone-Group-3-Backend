import rateLimit from "express-rate-limit";

// General rate limiter (e.g., 100 requests per 15 minutes)
export const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 100 requests per window
  message: {
    status: 429,
    message: "Too many requests from this IP. Please try again later.",
  },
});

// Stricter limiter for login route
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // max 5 attempts per 10 minutes
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: {
    status: 429,
    message: "Too many login attempts. Try again in 5 minutes.",
  },
});
