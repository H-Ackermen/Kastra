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
import { useState,useContext } from "react";
import { Button } from "@/components/ui/button";
import {ContentContext} from '../context/ContentContext' 

import Commbox from "./Commbox";
const UploadContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const {uploadContent} = useContext(ContentContext);

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
 
    console.log(formData);
    
    await uploadContent(formData);
  }


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
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      type="title"
                      placeholder="my first content"
                      required
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="p-2 rounded-md text-black" rows={4} placeholder="write your description here...">

                    </textarea>
                   
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="category">category</Label>
                    <Commbox value={category} onChange={handleCategoryChange} />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="email">Attachment</Label>
                    <Input
                      id="attachment"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" onClick={handleSubmit}>
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
