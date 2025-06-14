import path from "node:path";
import fs from "node:fs";

const downloadProfile = async (req, res) => {
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
};


export default downloadProfile
