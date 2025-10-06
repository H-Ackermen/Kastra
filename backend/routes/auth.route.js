import { Router } from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { verifyUserJWT } from "../middlewares/jwt.middleware.js";

const authRoutes = Router()

authRoutes.route("/current-user").get(verifyUserJWT, currentUser)
authRoutes.route("/register-user").post(registerUser)
authRoutes.route("/login-user").post(loginUser)
authRoutes.route("/logout-user").post(verifyUserJWT,logoutUser)

export default authRoutes