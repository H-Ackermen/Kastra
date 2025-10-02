import React, { useState } from "react";
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

import Navbar from "@/components/Navbar";
import UploadContent from "../components/UploadContent";
import NavigationMenu from "../components/NavigationMenu";
import MyContent from "../components/MyContent";
import MyCollection from "../components/MyCollection";
import MySaved from "../components/MySaved";

export default function KastraDashboard() {
  const [activebtn, setActivebtn] = useState("mycontent");

  const stats = [
    { label: "Total Works", value: "24", icon: <Image className="w-5 h-5" /> },
    { label: "Collections", value: "8", icon: <Grid3x3 className="w-5 h-5" /> },
    { label: "Likes", value: "342", icon: <Heart className="w-5 h-5" /> },
    { label: "Views", value: "1.2K", icon: <Eye className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <div className="text-purple-400">{stat.icon}</div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div>
        <NavigationMenu activebtn={activebtn} setActivebtn={setActivebtn} />
        <div>
          {activebtn === "mycontent" ? (
            <MyContent />
          ) : activebtn === "mycollection" ? (
            <MyCollection />
          ) : activebtn === "mysaved" ? (
            <MySaved />
          ) : null}
        </div>
      </div>
      {/* <UploadContent /> */}
    </div>
  );
}
