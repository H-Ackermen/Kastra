import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Sparkles, Palette, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-900 text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-6"
        >
          About <span className="text-pink-400">Kastra</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-3xl mx-auto text-lg text-gray-200 leading-relaxed mb-12"
        >
          Welcome to <span className="font-semibold text-pink-300">Kastra</span> — 
          your <span className="text-indigo-300">Gallery of Wonders</span>.  
          Kastra is a creative universe where imagination meets expression.  
          Artists, photographers, and writers can come together to share their work, 
          discover inspiration, and celebrate creativity without limits.
        </motion.p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg"
          >
            <Palette className="text-pink-400 w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-pink-300">
              A Canvas for Every Creator
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Upload and showcase your art, photography, or writing in beautifully 
              curated collections. Kastra lets you organize your works into themed boards — 
              your personal corner of the creative cosmos.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg"
          >
            <Users className="text-purple-400 w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-purple-300">
              A Community That Inspires
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Connect with creators around the world. Comment, collaborate, 
              and appreciate each other’s work — Kastra is not just a platform, 
              it’s a shared journey of artistic growth.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg"
          >
            <Sparkles className="text-fuchsia-400 w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-fuchsia-300">
              Intelligent Discovery
            </h3>
            <p className="text-gray-200 leading-relaxed">
              With AI-powered recommendations and smart tagging, Kastra learns your tastes 
              and helps you explore content that truly resonates — so every scroll feels like discovery.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white/10 rounded-2xl backdrop-blur-lg border border-white/20 shadow-lg"
          >
            <Heart className="text-pink-400 w-10 h-10 mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-pink-300">
              Made with Love for Artists
            </h3>
            <p className="text-gray-200 leading-relaxed">
              Every feature of Kastra is designed with creators in mind — 
              from saving favorites to managing boards and tracking engagement. 
              Our mission is to make your creative journey magical and effortless.
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-pink-400">Our Vision</h2>
          <p className="text-gray-200 leading-relaxed text-lg">
            To become the ultimate sanctuary for creators —  
            a place where every art form, every emotion, and every voice  
            can find its audience and shine eternally.  
            At Kastra, your creativity doesn’t fade — it becomes timeless.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
