const express = require('express');
const multer = require('multer');
const { storage } = require('../controllers/mediaController');
const upload = multer({ storage }); // Using Cloudinary storage

const router = express.Router();

// POST endpoint to handle image upload
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Respond with the URL of the uploaded image
  res.send({ url: req.file.path });
});

module.exports = router;
