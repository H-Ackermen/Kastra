import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { collectionContext } from "../context/CollectionContext";
import ContentCard from "../components/ContentCard";
import Navbar from "../components/Navbar";
import { Trash2,Users } from "lucide-react";

import CollaboratorSidebar from "../components/CollaboratorSidebar"

const CollectionPage = () => {
  const { collectionId } = useParams();
  const { collectionContent, fetchContentofCollection, removeContentFromCollection,fetchCollaborators,collaborators,removeCollaborator } = useContext(collectionContext);
  console.log("collection id of this collection",collectionId);

  useEffect(() => {
    const fetchData = async ()=> {await fetchContentofCollection(collectionId)
  await fetchCollaborators(collectionId)};
    fetchData();
  }, [collectionId]);
  const contents = collectionContent?.contents || [];

  const owner = collectionContent?.owner || null;
  const handleRemove = async (contentId) => {
    await removeContentFromCollection(collectionId, { contentId });
  };

  const handleRemoveCollaborator = async (collaboratorId) => {
    await removeCollaborator(collectionId,{collaboratorId})
  }
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* Header */}
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-semibold tracking-wide">
      {collectionContent?.name ?collectionContent?.name : "Collection"}
    </h1>
    <p className="text-gray-400 text-sm mt-1">
      Curated contents in this collection
    </p>
  </div>

  <div className="flex items-center gap-4">
    {/* Items count */}
    <span className="text-gray-500 text-sm">{contents.length} items</span>

    {/* Collaborator Sidebar Button */}
    <CollaboratorSidebar collectionId={collectionId} />
  </div>
</header>
<section className="p-6 border-b border-gray-800 bg-gray-900/50">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-violet-400" /> Team Members
        </h2>

        {/* Owner */}
        {owner && (
          <div className="mb-4">
            <h3 className="text-sm text-gray-400 uppercase">Owner</h3>
            <div className="mt-1 p-3 bg-gray-800 rounded-md flex justify-between items-center">
              <span className="font-medium text-white">{owner?.name}</span>
              <span className="text-sm text-gray-400">{owner?.email}</span>
            </div>
          </div>
        )}

        {/* Collaborators */}
       <div>
  <h3 className="text-sm text-gray-400 uppercase">Collaborators</h3>

  {collaborators?.length === 0 ? (
    <p className="text-gray-500 mt-2 text-sm">No collaborators yet.</p>
  ) : (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
      {collaborators?.map((c) => (
        <div
          key={c._id}
          className="p-3 bg-gray-800 rounded-md flex justify-between items-center hover:bg-gray-750 transition group"
        >
          <div className="flex flex-col">
            <span className="font-medium">{c.name}</span>
            <span className="text-sm text-gray-400">{c.email}</span>
          </div>

          {/* Delete Collaborator Button */}
          <button
            onClick={() => handleRemoveCollaborator(c._id)}
            className="bg-red-600/90 hover:bg-red-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            title="Remove collaborator"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      ))}
    </div>
  )}
</div>
      </section>
      {/* Content Grid */}
      <main className="p-6">
        {contents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
            <p className="text-lg">No contents in this collection!</p>
            <p className="text-sm text-gray-600 mt-2">
              Add some content to make it awesome.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {contents.map((content) => (
              <div key={content._id} className="relative group">
                {/* Trash button above the card */}
                <button
                  onClick={() => handleRemove(content._id)}
                  className="absolute top-3 right-3 z-10 bg-red-600/90 hover:bg-red-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                  title="Remove from collection"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>

                {/* Content Card */}
                <ContentCard post={content} />
              </div>
            ))}
          </div>
        )}
       
      </main>
    </div>
  );
};

export default CollectionPage;
