const multer = require("multer");

const { userImgDir, FILE_TYPES, MAX_FILE_SIZE } = require("../configs");

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, userImgDir);
  // },
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

const uploadUserImage = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = uploadUserImage;
