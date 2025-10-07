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
import { Folder } from "lucide-react"
import { collectionContext } from "../context/CollectionContext"

export default function SheetDemo() {
  const { collections, fetchCollectionByUser } = useContext(collectionContext)
  const [selectedCollections, setSelectedCollections] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollectionByUser()
    }
    fetchData()
  }, [])

  const handleSelect = (id) => {
    setSelectedCollections((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    )
  }

  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Folder className="w-4 h-4" /> Add to Collection
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
                  selectedCollections.includes(collection._id)
                    ? "bg-violet-100 border-violet-400 shadow-md"
                    : "bg-white hover:bg-slate-50 border-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(collection._id)}
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
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg shadow-sm"
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
