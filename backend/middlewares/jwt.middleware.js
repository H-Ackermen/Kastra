import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const verifyUserJWT = async (req,res,next) =>{
    try {
        
        const token = req.cookies?.accessToken;
        if(!token){
            return res.status(401).json({success:false,
                message:"Token Expired"
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
        return res.status(401).json({success:false, message:error.message})
    }
}