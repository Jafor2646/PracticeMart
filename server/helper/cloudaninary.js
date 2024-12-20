const cloudniary = require('cloudinary').v2;
const multer = require('multer');



cloudniary.config({
    cloud_name: "dxgcweupp",
    api_key: "462311269153178",
    api_secret: "EVeUzHFI4zB1aXDEGaFPd1rRRJ4",
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