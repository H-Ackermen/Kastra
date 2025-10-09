import React, { useState, useContext } from "react";
import {
  Sparkles,
  Upload,
  Grid3x3,
  Heart,
  Search,
  User,
  Settings,
  Bell,
  LogOut,
  Plus,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  Filter,
  Camera,
  Palette,
  BookOpen,
  Image,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import UploadContent from "../components/UploadContent";
import NavigationMenu from "../components/NavigationMenu";
import MyContent from "../components/MyContent";
import MyCollection from "../components/MyCollection";
import MySaved from "../components/MySaved";
import SearchBar from "../components/SearchBar";
import ContentInsights from "../components/ContentInsight";
import { authContext } from "../context/AuthContext";

export default function KastraDashboard() {
  const [activebtn, setActivebtn] = useState("mycontent");
  const { user } = useContext(authContext);

  const stats = [
    { label: "Total Works", value: "24", icon: <Image className="w-5 h-5" /> },
    { label: "Collections", value: "8", icon: <Grid3x3 className="w-5 h-5" /> },
    { label: "Likes", value: "342", icon: <Heart className="w-5 h-5" /> },
    { label: "Views", value: "1.2K", icon: <Eye className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 modern-pattern">
      {/* Top Navigation */}
      <Navbar />
      
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold modern-title text-gray-900 mb-2">
            Welcome back, <span className="modern-text">{user?.username || 'Creator'}</span>!
          </h1>
          <p className="text-gray-600 modern-subtitle">
            Manage your creative works and track your progress
          </p>
        </div>
      </motion.div>

      {/* Content Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ContentInsights userId={user?._id} />
      </motion.div>

      {/* Navigation and Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container mx-auto px-6 pb-8"
      >
        <NavigationMenu activebtn={activebtn} setActivebtn={setActivebtn} />
        <motion.div
          key={activebtn}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activebtn === "mycontent" ? (
            <MyContent />
          ) : activebtn === "mycollection" ? (
            <MyCollection />
          ) : activebtn === "mysaved" ? (
            <MySaved />
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
