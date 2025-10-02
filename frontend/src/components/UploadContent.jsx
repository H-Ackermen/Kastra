import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Commbox from "./Commbox";
const UploadContent = () => {
  const [showform, setShowForm] = useState(false);
  const handleClick = () => {
    setShowForm(!showform);
  };


  return (
    <div className="flex justify-end w-full">
      <Button  onClick={handleClick}>Add Content</Button>
      {showform && (
        <div className="flexw-full left-100 justify-center items-center mt-10">
          <Card className="w-full max-w-sm bg-[#a855f7] text-[#1a293b]">
            <CardHeader>
              <CardTitle>Add your new content </CardTitle>
              <CardDescription className="text-[#1a293b]">
                enter your title and description and attach your files
              </CardDescription>
              {/* <CardAction>
                <Link to="/signup">Sign-up</Link>
              </CardAction> */}
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Title</Label>
                    <Input
                      id="title"
                      type="title"
                      placeholder="my first content"
                      required
                    />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="email">Description</Label>
                    <textarea>

                    </textarea>
                   
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="email">category</Label>
                    <Commbox />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="email">Attachment</Label>
                    <Input
                      id="attachment"
                      type="file"
                      
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
               Upload
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UploadContent;
