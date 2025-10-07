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
import { contentContext } from "../context/ContentContext";
import Commbox from "./Commbox";

const UploadContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { uploadContent } = useContext(contentContext);

  const handleCategoryChange = (selectedValue) => {
    setCategory(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);

    console.log("Uploading:", { title, description, category, file });
    await uploadContent(formData);
    setShowForm(false);
  };

  return (
    <>
      <div className="ml-10 mr-10">
        <Button onClick={() => setShowForm(!showForm)}>Add Content</Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <Card className="w-full max-w-sm bg-[#a855f7] text-[#1a293b] relative">
            <CardHeader>
              <CardTitle>Add your new content</CardTitle>
              <CardDescription className="text-[#1a293b]">
                Enter your title and description and attach your file
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Title */}
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="My first content"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

                {/* Category */}
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Commbox value={category} onChange={handleCategoryChange} />
                </div>

                {/* File Upload */}
                <div className="grid gap-2">
                  <Label htmlFor="attachment">Attachment</Label>
                  <Input
                    id="attachment"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>

                {/* Submit + Cancel */}
                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Upload
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
