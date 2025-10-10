import { Router } from "express";

import { verifyUserJWT } from "../middlewares/jwt.middleware.js";
import { followUser, unfollowUser,fetchFollowing, fetchFollowers } from "../controllers/user.controller.js";
import { editProfile } from "../controllers/editProfile.controller.js";
const userRoutes = Router()

userRoutes.route("/follow-user").post(verifyUserJWT, followUser)
userRoutes.route("/unfollow-user").delete(verifyUserJWT,unfollowUser)
userRoutes.route("/fetch-following").get(verifyUserJWT,fetchFollowing)
userRoutes.route("/fetch-follower").get(verifyUserJWT,fetchFollowers)
userRoutes.route("/edit-profile").put(verifyUserJWT , editProfile);
export default userRoutes