import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useContext, useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { collectionContext } from "../context/CollectionContext"

export default function SheetDemo({contentId}) {
  const { collections, fetchCollectionByUser,addContentToCollection } = useContext(collectionContext)
  const [selectedCollectionId, setSelectedCollectionId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollectionByUser()
    }
    fetchData()
  }, [])

  const handleSelect = (id) => {
    setSelectedCollectionId((prevId) => (prevId === id ? "" : id)
     
    )
  }
  const handleSubmit=async()=>
  {
    const res=await addContentToCollection(selectedCollectionId,{contentId});
    if(res.data.alreadyAdded)
    {
      
      alert("already saved");
    }
    else 
    {
      alert("content added successfully")
    }
  }
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center ">
          <Plus /> 
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-gradient-to-b w-90 from-slate-50 to-slate-100">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            Add To Your Collections
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            Choose the collections where you want this content to appear.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3 max-h-[60vh] overflow-y-auto ">
          {collections.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No collections yet!</p>
          ) : (
            collections.map((collection) => (
              <div
                key={collection._id}
                onClick={() => handleSelect(collection._id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedCollectionId===collection._id
                    ? "bg-violet-100 border-violet-400 shadow-md"
                    : "bg-white hover:bg-slate-50 border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                     checked={selectedCollectionId === collection._id}
                    onChange={() => handleSelect(collection._id)}
                    className="appearance-none w-5 h-5 border-2 border-violet-400 rounded-full checked:bg-violet-500 checked:border-violet-500 cursor-pointer transition-all duration-200"
                  />
                  <label className="text-lg font-medium text-gray-800">
                    {collection.name}
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="mt-6 flex justify-between">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg shadow-sm"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full mt-2">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
