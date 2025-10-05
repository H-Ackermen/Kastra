import React, { useState } from "react";
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
import Commbox from "./Commbox";

const UploadContent = () => {
  const [showform, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showform);
  };

  return (
    <>
      
      <div className="ml-10 mr-10">
        <Button onClick={handleClick}>Add Content</Button>
      </div>

      {showform && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <Card className="w-full max-w-sm bg-[#a855f7] text-[#1a293b] relative">
            <CardHeader>
              <CardTitle>Add your new content</CardTitle>
              <CardDescription className="text-[#1a293b]">
                Enter your title and description and attach your files
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="My first content"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      className="p-2 border rounded-md"
                      placeholder="Write description..."
                      required
                    ></textarea>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Commbox />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="attachment">Attachment</Label>
                    <Input id="attachment" type="file" required />
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Upload
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default UploadContent;
