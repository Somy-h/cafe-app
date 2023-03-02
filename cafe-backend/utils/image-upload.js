const multer = require("multer"); // For uploading avatar image file
const path = require("path");
const imagePath = path.join(__dirname, "../public/images/menu");

const storage = multer.diskStorage({
    destination: imagePath,
    filename: (req, file, cb) => {
      const uniqueSuffix = "-" + Date.now() + path.extname(file.originalname);
      cb(null, `${file.originalname}${uniqueSuffix}`);
    },
  });

  const imageUpload = multer({
    storage: storage,
  }).single("menu");


module.exports = imageUpload;