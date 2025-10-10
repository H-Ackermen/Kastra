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
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Sparkles, FileImage, FileVideo } from "lucide-react";
import { toast } from "react-toastify";

const UploadContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state added
  const { uploadContent } = useContext(contentContext);

  const handleCategoryChange = (selectedValue) => {
    setCategory(selectedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !file) {
      toast.error("Please fill in all fields and select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);

    console.log("Uploading:", { title, description, category, file });
    try {
      setLoading(true); // ✅ start loading
      await uploadContent(formData);
      toast.success("Content uploaded successfully!");
      setShowForm(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
    } catch (error) {
      toast.error("Failed to upload content. Please try again.");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <>
      <div className="ml-10 mr-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="modern-button text-white font-medium modern-subtitle flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Add Content
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm"
          >
            {loading ? (
              // ✅ Loading UI
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="modern-card rounded-xl shadow-lg p-12 flex flex-col items-center justify-center bg-white"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"
                />
                <p className="text-gray-600 modern-subtitle">
                  Uploading your content...
                </p>
              </motion.div>
            ) : (
              // ✅ Upload Form
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="w-full max-w-md modern-card border border-gray-200 shadow-2xl">
                  <CardHeader className="text-center relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowForm(false)}
                      className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center justify-center gap-2 mb-4"
                    >
                      <div className="w-10 h-10 modern-gradient rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xl font-bold modern-text modern-title">
                        Upload Content
                      </span>
                    </motion.div>

                    <CardTitle className="text-lg modern-title text-gray-900">
                      Share Your Creativity
                    </CardTitle>
                    <CardDescription className="text-gray-600 modern-subtitle mt-2">
                      Upload your masterpiece and inspire others
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {/* Title */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid gap-2"
                      >
                        <Label htmlFor="title" className="modern-subtitle text-gray-700">
                          Title
                        </Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="My amazing creation"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="modern-input"
                          required
                        />
                      </motion.div>

                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid gap-2"
                      >
                        <Label htmlFor="description" className="modern-subtitle text-gray-700">
                          Description
                        </Label>
                        <textarea
                          id="description"
                          className="modern-input resize-none"
                          rows={4}
                          placeholder="Tell us about your creation..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </motion.div>

                      {/* Category */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid gap-2"
                      >
                        <Label htmlFor="category" className="modern-subtitle text-gray-700">
                          Category
                        </Label>
                        <Commbox value={category} onChange={handleCategoryChange} />
                      </motion.div>

                      {/* File Upload */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid gap-2"
                      >
                        <Label htmlFor="attachment" className="modern-subtitle text-gray-700">
                          Upload File
                        </Label>
                        <div className="relative">
                          <Input
                            id="attachment"
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="modern-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            required
                          />
                          {file && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-2 flex items-center gap-2 text-sm text-gray-600"
                            >
                              {file.type.startsWith("image/") ? (
                                <FileImage className="w-4 h-4 text-green-500" />
                              ) : (
                                <FileVideo className="w-4 h-4 text-blue-500" />
                              )}
                              <span className="modern-subtitle">{file.name}</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>

                      {/* Submit + Cancel */}
                      <CardFooter className="flex flex-col gap-3 pt-4">
                        <Button
                          type="submit"
                          className="w-full modern-button text-white modern-subtitle"
                          disabled={loading}
                        >
                          {loading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block rounded-full h-4 w-4 border-b-2 border-white mr-2"
                            />
                          ) : (
                            <Upload className="w-4 h-4 mr-2" />
                          )}
                          {loading ? "Uploading..." : "Upload Content"}
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full modern-card border border-gray-200 text-gray-700 hover:text-indigo-600 modern-subtitle"
                          type="button"
                          onClick={() => setShowForm(false)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UploadContent;
