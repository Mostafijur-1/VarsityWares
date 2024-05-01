const cloudinary = require("../configs/cloudinary");

const publicId = async (imageUrl) => {
  const parts = imageUrl.split("/");
  const publicId = parts[parts.length - 1].split(".")[0];
  return publicId;
};

const deleteFilefromCloudinary = async (folder, publicID) => {
  const { result } = await cloudinary.uploader.destroy(`${folder}/${publicID}`);
  if (result !== "ok") {
    throw createError(500, "Failed to delete image from cloudinary");
  }
};

module.exports = { publicId, deleteFilefromCloudinary };
