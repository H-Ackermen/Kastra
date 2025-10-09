export const uploadFile = (req, res) => {

    const file = req.file;
    if(!file){
        return res.status(400).json({
            success:false,
            message:"No file uploaded"
        })
    }
    if(!file.mimetype.startsWith('image/') && file.size > 10 * 1024 * 1024){
        return res.status(400).json({
            success:false,
            message:"File size should be less than 10MB"
        })
    }
    if(!file.mimetype.startsWith("video/") && file.size > 100 * 1024 * 1024){
        return res.status(400).json({
            success:false,
            message:"File size should be less than 50MB"
        })
    }
    const fileURL = `/uploads/${file.filename}`;

    res.status(200).json({
        sucess:true,
        message:"File uploaded successfully",
        data :{
            fileName: file.filename,
            fileURL,
            fileType: file.mimetype,
            fileSize: file.size
        }
    })
}