const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
