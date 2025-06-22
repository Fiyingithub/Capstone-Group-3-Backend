// import path from "node:path";
// import fs from "node:fs";

// const downloadProfile = async (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join("uploads", filename);
//   if (!fs.existsSync) {
//     return errorResponse(res, 404, "File not found");
//   }

//   res.download(filePath, (err) => {
//     if (err) {
//       return errorResponse(res, 500, "Error downloading file");
//     }
//   });
// };

// routes/download.js

import axios from "axios";
import logger from "../Utils/Logger.js";
import Income from "../Models/income.model.js";

const downloadProfile = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const { id: userId } = req.user;

    // Verify user owns this income record
    const income = await Income.findOne({
      where: { id: incomeId, userId: userId },
    });

    if (!income || !income.filePath) {
      return res.status(404).json({
        status: false,
        message: "File not found",
      });
    }

    // Get image from Cloudinary
    const response = await axios({
      method: "GET",
      url: income.filePath,
      responseType: "stream",
    });

    // Set headers for download
    const filename = `receipt_${incomeId}.jpg`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Pipe the image data to response
    response.data.pipe(res);
  } catch (error) {
    logger.info("Download error:", error);
    res.status(500).json({
      status: false,
      message: "Download failed",
    });
  }
};

export default downloadProfile;
