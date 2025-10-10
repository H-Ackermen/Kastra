import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { authContext } from "../context/AuthContext";
import { EditProfileContext } from "../context/EditProfileContext";
import Navbar from "../components/Navbar";
import { User, Mail, Camera, Save } from "lucide-react";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { user } = useContext(authContext);
  const { editProfile, loading, error, success } = useContext(EditProfileContext);

  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [profileFile, setProfileFile] = useState(null); // new file
  const [profileURL, setProfileURL] = useState(""); // preview URL

  // initialize form
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setUserName(user.username || "");
      setEmail(user.email || "");
      setProfileURL(user.profilePicture || "");
    }
  }, [user]);

  // show toast notifications
  useEffect(() => {
    if (success) toast.success(success);
    if (error) toast.error(error);
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);

    // append file only if user selects new file
    if (profileFile) {
      formData.append("profilePicture", profileFile);
    }
    console.log(formData)
    await editProfile(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 modern-pattern">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center modern-title text-gray-900 mb-8"
        >
          Edit <span className="text-indigo-600">Profile</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto modern-card rounded-2xl shadow-lg p-8"
        >
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profileFile ? URL.createObjectURL(profileFile) : profileURL || "/default-avatar.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-md"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full cursor-pointer transition-all shadow-lg"
              >
                <Camera className="text-white w-4 h-4" />
              </label>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfileFile(file);
                    setProfileURL(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none modern-subtitle"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none modern-subtitle"
                placeholder="Choose a unique username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none modern-subtitle"
                placeholder="Enter your email address"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg modern-button text-white font-semibold shadow-lg mt-4"
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
