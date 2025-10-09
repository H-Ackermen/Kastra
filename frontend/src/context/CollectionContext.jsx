import { createContext, useContext, useState } from "react";
import { errorContext } from "./ErrorContext";
import axios from "axios";
import { toast } from 'react-toastify';

export const collectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
  const { handleApiError } = useContext(errorContext);
  const [collections, setCollections] = useState([]);
  const [collabCollections, setcollabCollections] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [collectionContent, setCollectionContents] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const createCollection = async (formData) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/collections/create-collection`,
        formData,
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        // add new collection to existings collections
        await fetchCollectionByUser();
      }
    } catch (error) {
      console.log("Error: ", error.message);
      handleApiError(error);
    }
  };

  const addContentToCollection = async (collectionId, formData) => {
    try {
      console.log(formData);
      const res = await axios.put(
        `${API_URL}/api/collections/${collectionId}/add-content`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        // update collection which is changed
        await fetchContentofCollection(collectionId);
      }
      return res;
    } catch (error) {
      console.log("Error: ", error.message);
      handleApiError(error);
    }
  };

  const removeContentFromCollection = async (collectionId, formData) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/collections/${collectionId}/remove-content`,
        { data: formData, withCredentials: true }
      );
      if (res.data.success) {
        await fetchContentofCollection(collectionId);
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/collections/${collectionId}/delete-collection`,
        { withCredentials: true }
      );
      console.log(res.data);

      if (res.data.success) {
        await fetchCollectionByUser();
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  };

  const fetchCollectionByUser = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/collections/fetch-collection`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setCollections(res.data.collections);
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  };

  const fetchContentofCollection = async (collectionId) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/collections/${collectionId}/get-content`,
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data.collection);
        
        setCollectionContents(res.data.collection);
      }
    } catch (error) {
      console.log("Error ",error.message);
      handleApiError(error);
    }
  };

  const addCollaborator = async (collectionId, formData) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/collections/${collectionId}/add-collaborator`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        if (res.data.alreadyExists) {
          toast.warning("This user is already a collaborator!");
        } else  {
          toast.success("Collaborator added successfully!");
        }
        console.log(res.data.message);
        await fetchCollaborators(collectionId);
      }
    } catch (error) {
      console.log("Error ",  error.message);
      toast.error(error.message);
      handleApiError(error);
    }
  };

  const fetchCollaborators = async (collectionId) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/collections/${collectionId}/fetch-collaborators`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setCollaborators(res.data.collaborators);
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  };

  const fetchCollectionByCollaborators = async () => {
    try {
      console.log("Working")
      const res = await axios.get(
        `${API_URL}/api/collections/fetch-collaborators-collection`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setcollabCollections(res.data.collections);
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  };

  const removeCollaborator = async (collectionId,formData) => {
     try {
      console.log("Working")
      const res = await axios.delete(
        `${API_URL}/api/collections/${collectionId}/remove-collaborator`,
        {data:formData, withCredentials: true }
      );
      if (res.data.success) {
        await fetchCollaborators(collectionId)
        toast.success("Removed Collaborator Successfully")
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  }

  const removeYourselfAsCollaborator = async (collectionId) => {
     try {
      console.log("Working")
      const res = await axios.delete(
        `${API_URL}/api/collections/${collectionId}/remove-yourself-collaborator`,
        { withCredentials: true }
      );
      if (res.data.success) {
        await fetchCollectionByCollaborators();
        toast.success("Removed You As Collaborator Successfully")
      }
    } catch (error) {
      console.log("Error ", error.message);
      handleApiError(error);
    }
  }

  const contextValues = {
    collections,
    collectionContent,
    collabCollections,
    collaborators,
    removeYourselfAsCollaborator,
    removeCollaborator,
    addContentToCollection,
    createCollection,
    removeContentFromCollection,
    deleteCollection,
    fetchCollectionByUser,
    fetchContentofCollection,
    fetchCollaborators,
    fetchCollectionByCollaborators,
    addCollaborator,
  };

  return (
    <collectionContext.Provider value={contextValues}>
      {children}
    </collectionContext.Provider>
  );
};

export default CollectionContextProvider;
