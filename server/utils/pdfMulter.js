const multer = require('multer');
const path = require('path');

// Storage for resumes
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/docs/resumes');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `resume-${req.user.id}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// File filter
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

exports.uploadResume = multer({
  storage: resumeStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
