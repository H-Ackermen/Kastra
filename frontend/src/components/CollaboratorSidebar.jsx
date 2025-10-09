import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Plus } from "lucide-react";
import { collectionContext } from "../context/CollectionContext";
import { useContext } from "react";

export default function AddCollaboratorSheet({ collectionId }) {
  const { addCollaborator } = useContext(collectionContext);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    try {
      await addCollaborator(collectionId, { email });
      setEmail("")
    } catch (err) {
      console.error("Error adding collaborator:", err);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center text-purple-800">
          <Plus /> Add Collaborator
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-gradient-to-b w-90 from-slate-50 to-slate-100">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold text-gray-800">
            Add a Collaborator
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            Enter the email of the user you want to add to this collection.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter collaborator's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <SheetFooter className="mt-6 flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg shadow-sm"
            onClick={handleSubmit}
          >
            Add Collaborator
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
