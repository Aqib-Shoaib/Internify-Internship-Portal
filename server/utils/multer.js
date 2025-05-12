const multer = require('multer');
const path = require('path');

// Define where and how to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'users'; // default
    if (req.user.role === 'COMPANY') folder = 'companies';

    cb(null, `public/img/${folder}`);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// Optional: File filter (only allow images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error('Only images are allowed'));
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
