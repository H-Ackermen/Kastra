import fs from 'fs'
import { cloudinary } from './config/connectCloudinary.js'
const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) return null;

        // upload file to cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "kastra",
            // all type of files
            resource_type: "auto",
        });
        console.log("File is uploaded on cloudinary" , result.url);
        
        return result;
    }
    catch (error) {
        fs.unlinkSync(filePath);
        // remove the locally saved file
        console.error("Error uploading file to Cloudinary:", error);
    }
}
export { uploadOnCloudinary }