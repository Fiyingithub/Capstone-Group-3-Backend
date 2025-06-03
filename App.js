import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import LoggerErrorHandler from "./Middlewares/LoggerErrorHandler.js";
import LoggerRequestHandler from "./Middlewares/LoggerRequestHandler.js";
import routes from "./Routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Swagger/swagger.js";
import helmet from "helmet";
import { sequelize } from "./config/db.config.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

// helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
const corsOptions = {
  origin: ["http://localhost:4000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// Logger
app.use(LoggerErrorHandler);
app.use(LoggerRequestHandler);

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Welcome to the Tech Crush Backend Group 3!");
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join("uploads", filename);
  if (!fs.existsSync) {
    return errorResponse(res, 404, "File not found");
  }

  res.download(filePath, (err) => {
    if (err) {
      return errorResponse(res, 500, "Error downloading file");
    }
  });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.info("Server is running on port:", PORT);
    });
  })
  .catch((err) => {
    console.log("Error syncing database: ", err);
  });
