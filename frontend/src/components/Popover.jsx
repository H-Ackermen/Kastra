import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { collectionContext } from "../context/CollectionContext";

export default function SheetDemo({ contentId }) {
  const {
    collections,
    collabCollections,
    fetchCollectionByUser,
    fetchCollectionByCollaborators,
    addContentToCollection,
  } = useContext(collectionContext);

  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollectionByUser();
      await fetchCollectionByCollaborators();
    };
    fetchData();
  }, []);

  const handleSelect = (id) => {
    setSelectedCollectionId((prevId) => (prevId === id ? "" : id));
  };

  const handleSubmit = async () => {
    const res = await addContentToCollection(selectedCollectionId, { contentId });
    if (res.data.alreadyAdded) {
      alert("Already saved");
    } else {
      alert("Content added successfully");
    }
  };

  const renderCollectionList = (list) =>
    list.map((collection) => (
<div
  key={collection._id}
  onClick={() => handleSelect(collection._id)}
  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
    selectedCollectionId === collection._id
      ? "bg-accent/20 border-accent shadow-md"
      : "bg-card hover:bg-muted border-border"
  }`}
>
  <div className="flex items-center  gap-4">
    <input
      type="radio"
      checked={selectedCollectionId === collection._id}
      onChange={() => handleSelect(collection._id)}
      className="appearance-none w-5 h-4 border-2 border-primary rounded-full checked:bg-primary checked:border-primary cursor-pointer transition-all duration-200"
    />
    <label className="text-base font-medium text-foreground">
      {collection.name}
    </label>
  </div>
</div>

    ));

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center bg-violet-600 hover:bg-violet-700 text-white shadow-lg"
        >
          <Plus className="mr-1" /> Add to Collection
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-popover text-popover-foreground border border-border backdrop-blur-xl shadow-xl">
  <SheetHeader>
    <SheetTitle className="text-xl font-semibold text-foreground">
      Add To Your Collections
    </SheetTitle>
    <SheetDescription className="text-muted-foreground">
      Choose the collections where you want this content to appear.
    </SheetDescription>
  </SheetHeader>

  <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto">
    <h3 className="text-muted-foreground font-semibold mb-2 uppercase text-sm ml-3">
      Your Collections
    </h3>
    {collections.length === 0 ? (
      <p className="text-muted-foreground text-center mt-2">
        No collections yet!
      </p>
    ) : (
      renderCollectionList(collections)
    )}

    <h3 className="text-muted-foreground font-semibold mt-6 mb-2 uppercase text-sm ml-3">
      Collaborations
    </h3>
    {collabCollections.length === 0 ? (
      <p className="text-muted-foreground text-center mt-2">
        No collaborations yet!
      </p>
    ) : (
      renderCollectionList(collabCollections)
    )}
  </div>

  <SheetFooter className="mt-6 flex flex-col gap-3">
    <Button
      type="submit"
      className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold py-2 rounded-lg shadow-md transition"
      onClick={handleSubmit}
    >
      Save Changes
    </Button>
    <SheetClose asChild>
      <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
        Close
      </Button>
    </SheetClose>
  </SheetFooter>
</SheetContent>
    </Sheet>
  );
}
