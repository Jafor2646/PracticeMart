const cloudniary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv');


cloudniary.config({
    cloud_name: dotenv.config().parsed.CLOUDINARY_CLOUD_NAME,
    api_key: dotenv.config().parsed.CLOUDINARY_API_KEY,
    api_secret: dotenv.config().parsed.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    
    const result = await cloudniary.uploader.upload(file, {
        resource_type: "auto",

    });
    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };