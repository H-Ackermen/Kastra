import  User  from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const verifyUserJWT = async (req,res,next) =>{
    try {
        // console.log("Resuq ",req)
        // console.log(req.headers["authorization"]);
        
        const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
        if(!token){
            return res.status(401).json({success:false,
                message:"Login Again" // For Better Handling
            })
        }

        // Decoding Token
        const decodedToken = jwt.verify(token,process.env.ACCESS_SECRET_KEY);

        const user = await User.findById(decodedToken?._id).select("-password")

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
            req.user = user;
            next();
    } catch (error) {
        console.log("error in verifyuser jwt middleware");
        return res.status(401).json({success:false, message:error.message})
    }
}