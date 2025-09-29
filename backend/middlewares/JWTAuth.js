import { User } from "../models/user.model.js";

export const verifyUserJWT = async (req,res,next) =>{
    try {
        const token = req.cookie?.accessToken;
        if(!token){
            return res.status(401).json({success:false,
                message:"Token Expired"
            })
        }

        // Decoding Token
        const decodedToken = JsonWebTokenError.verify(token,process.env.ACCESS_SECRET_KEY);

        const user = await User.findById(decodedToken?._id).select("-password")

        if(!rapper){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({success:false, message:error.message})
    }
}