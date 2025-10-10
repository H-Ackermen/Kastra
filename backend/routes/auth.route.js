import { Router } from "express";
import { currentUser, forgotPassword, loginUser, logoutUser, registerUser, resetPassword, validateResetToken } from "../controllers/auth.controller.js";
import { verifyUserJWT } from "../middlewares/jwt.middleware.js";

const authRoutes = Router()

authRoutes.route("/current-user").get(verifyUserJWT, currentUser)
authRoutes.route("/register-user").post(registerUser)
authRoutes.route("/login-user").post(loginUser)
authRoutes.route("/logout-user").post(verifyUserJWT,logoutUser)
authRoutes.route("/forgot-password").post(forgotPassword)
authRoutes.route("/reset-password").put(resetPassword)
authRoutes.route("/verify-token").get(validateResetToken)

export default authRoutes