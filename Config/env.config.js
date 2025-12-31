import dotenv from "dotenv";

// Correct dotenv config
dotenv.config();

const ENV = {
    nodeEnv: process.env.NODE_ENV || "development",
    db_port: process.env.NODE_ENV === "development" ? process.env.DB_PORT : process.env.PROD_DB_PORT,

    port: process.env.PORT || 5000,

    db: {
        host: process.env.NODE_ENV === "development" ? process.env.DEV_DB_HOST : process.env.PROD_DB_HOST,
        user: process.env.NODE_ENV === "development" ? process.env.DEV_DB_USER : process.env.PROD_DB_USER,
        password: process.env.NODE_ENV === "development" ? process.env.DEV_DB_PASSWORD : process.env.PROD_DB_PASSWORD,
        name: process.env.NODE_ENV === "development" ? process.env.DEV_DB_NAME : process.env.PROD_DB_NAME,
        dialect: process.env.NODE_ENV === "development" ? process.env.DEV_DB_DIALECT : process.env.PROD_DB_DIALECT,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },

    mail: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    brevo: {
        user: process.env.BREVO_USER,
        key: process.env.BREVO_KEY,
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    baseUrl: {
        development: process.env.DEV_BASE_URL,
        production: process.env.PROD_BASE_URL,
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
    },
    google: {
        apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    },
    groq: {
        apiKey: process.env.GROQ_API_KEY,
    },
    redis: {
        url: process.env.REDIS_URL,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
        username: process.env.REDIS_USER, // optional, Redis Cloud uses default
    },
};

export default ENV;
