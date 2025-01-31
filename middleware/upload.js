const multer = require('multer');
const path = require('path');
const fs = require('fs')

const uploadDirectory = path.join('/tmp', 'files');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Menggunakan diskStorage
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,uploadDirectory)
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})

// Filter tipe file
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true); // File valid
  } else {
    const error = new Error('Error: Only JPEG, JPG, and PNG files are allowed!')
    error.statusCode = 400
    cb(error); // File tidak valid
  }
};

// Konfigurasi multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5 MB
  fileFilter
});

module.exports = {upload};
