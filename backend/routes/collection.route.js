import { Router } from "express";
import { addContentToCollection, createCollection, deleteCollection, fetchCollectionByOwner, getContentofCollection, removeContentFromCollection,addCollaborator,fetchCollectionByCollaborators,fetchCollaborators,removeYourselfAsCollaborator,removeCollaborator } from "../controllers/collection.controller.js";
import { verifyUserJWT } from "../middlewares/jwt.middleware.js";
import { checkCollectionAccess, verifyCollectionOwner } from "../middlewares/collection.middleware.js";

const collectionRouter = Router()

/*
 Any one can remove content - checkCollectionAccess
Any one can add content - checkCollectionAccess

Only owner can delete content - verifyOwner
*/
collectionRouter.route("/create-collection").post(verifyUserJWT, createCollection)
collectionRouter.route("/:id/add-content").put(verifyUserJWT,checkCollectionAccess, addContentToCollection)
collectionRouter.route("/:id/remove-content").delete(verifyUserJWT,checkCollectionAccess, removeContentFromCollection)
collectionRouter.route("/:id/delete-collection").delete(verifyUserJWT,verifyCollectionOwner, deleteCollection)
collectionRouter.route("/fetch-collection").get(verifyUserJWT,fetchCollectionByOwner)
collectionRouter.route("/:id/get-content").get(verifyUserJWT,checkCollectionAccess,getContentofCollection)
collectionRouter.route("/:id/add-collaborator").post(verifyUserJWT,verifyCollectionOwner,addCollaborator)
// ---------------------------------------------------
collectionRouter.route("/:id/remove-collaborator").delete(verifyUserJWT,verifyCollectionOwner,removeCollaborator)
collectionRouter.route("/:id/remove-yourself-collaborator").delete(verifyUserJWT,checkCollectionAccess,removeYourselfAsCollaborator)
collectionRouter.route("/:id/fetch-collaborators").get(verifyUserJWT,checkCollectionAccess,fetchCollaborators)
collectionRouter.route("/fetch-collaborators-collection").get(verifyUserJWT,fetchCollectionByCollaborators)

export default collectionRouter