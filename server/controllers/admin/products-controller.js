const {imageUploadUtil} = require("../../helper/cloudaninary");

const handleImageUpload = async (req, res) => {
   try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:"+req.file.mimetype+";base64,"+b64;
        const result = await imageUploadUtil(url);
        res.json({
            success: true,
            message: 'Image uploaded',
            result
        })

        

   }catch(err) {
        console.log(err);
        res.status(500).json({success: false,  message: 'Error occured' });
   } 
};

module.exports = { handleImageUpload };
