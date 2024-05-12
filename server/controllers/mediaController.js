
const cloudinary = require('cloudinary').v2;
const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


require('dotenv').config({path: dotenvPath});

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ChatApp', // Use whatever folder name you like
    allowedFormats: ['jpeg', 'png', 'jpg'], // Formats you want to accept
  },
});

module.exports = { cloudinary, storage };

