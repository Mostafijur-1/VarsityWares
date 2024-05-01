const fs = require("fs").promises;

const deleteImage = async (ImagePath) => {
  try {
    await fs.access(ImagePath);
    await fs.unlink(ImagePath);
    console.log("Image deleted");
  } catch (error) {
    console.error("Image does not exist or could not be deleted");
    throw error;
  }
};

module.exports = { deleteImage };
