import multer from "multer";

const storage = multer.memoryStorage();

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError =
        "Please upload a valid image file (JPG, PNG) under 5MB.";
      cb(null, false);
    }
  },
});

export default upload;
