const multer = require("multer");

const FILE_TYPES = ["image/jpg", "image/png", "image/jpeg"];
const MAX_FILE_SIZE = 1024 * 1024 * 2;

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!FILE_TYPES.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};

const uploadFile = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = uploadFile;
