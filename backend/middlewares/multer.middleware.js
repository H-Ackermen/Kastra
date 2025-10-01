import multer from "multer";
const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , 'uploads/');
    },
    filename : function(req, file , cb){
        cb(null , Date.now() + "-" + file.originalname);
    }
});
export const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4'){ 
            cb(null , true);
        }
        else{
            cb(new Error('Only .jpeg, .jpg, .png and .mp4 format allowed!'));
        }
    }
});
