import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { collectionContext } from "../context/CollectionContext";

const UploadContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

 
  const { createCollection } = useContext(collectionContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {name,description}

    console.log("Creating", formData);
    await createCollection(formData);
    setShowForm(false);
  };

  return (
    <>
      <div className="ml-10 mr-10">
        <Button onClick={() => setShowForm(!showForm)}>Add Collection</Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <Card className="w-full max-w-sm bg-[#a855f7] text-[#1a293b] relative">
            <CardHeader>
              <CardTitle>Add your new Collection</CardTitle>
              <CardDescription className="text-[#1a293b]">
                Enter your title and Description 
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Title */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="Name"
                    type="text"
                    placeholder="Collection Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    className="p-2 border rounded-md text-black"
                    rows={4}
                    placeholder="Write your description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Submit + Cancel */}
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default UploadContent;
