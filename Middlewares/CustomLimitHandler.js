const customLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,  // 5 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "You are sending too many requests. Please slow down.",
    });
  },
});
