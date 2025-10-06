import { Router } from "express";
import { addContentToCollection, createCollection, deleteCollection, fetchCollectionByOwner, getContentofCollection, removeContentFromCollection } from "../controllers/collection.controller.js";
import { verifyUserJWT } from "../middlewares/jwt.middleware.js";
import { verifyCollectionOwner } from "../middlewares/collection.middleware.js";

const collectionRouter = Router()

collectionRouter.route("/create-collection").post(verifyUserJWT, createCollection)
collectionRouter.route("/:id/add-content").put(verifyUserJWT,verifyCollectionOwner, addContentToCollection)
collectionRouter.route("/:id/remove-content").delete(verifyUserJWT,verifyCollectionOwner, removeContentFromCollection)
collectionRouter.route("/:id/delete-collection").delete(verifyUserJWT,verifyCollectionOwner, deleteCollection)
collectionRouter.route("/fetch-collection").get(verifyUserJWT,fetchCollectionByOwner)
collectionRouter.route("/:id/get-content").get(verifyUserJWT,verifyCollectionOwner,getContentofCollection)


export default collectionRouter