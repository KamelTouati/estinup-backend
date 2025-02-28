const multer = require("multer");

// Photo Upload Middleware
const photoUpload = multer({
  storage: multer.memoryStorage(), // Stocker en mémoire au lieu du disque
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 }, // 1MB
});

module.exports = photoUpload;
