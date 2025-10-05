import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary';
const uploadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) {
            console.log("File path is missing");
            return null;
        }

        // upload file to cloudinary
    
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "kastra",
            // all type of files
            resource_type: "auto",
        });
        console.log("File is uploaded on cloudinary" , result.url);
        fs.unlinkSync(filePath);
        return result;
    }
    catch (error) {
       try {
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error("Error deleting local file:", err);
        }
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
}
export { uploadOnCloudinary }