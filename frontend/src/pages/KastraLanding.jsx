import React from 'react';
import { Camera, Palette, BookOpen, Sparkles, Users, Heart, Grid3x3, Zap, Star } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchBar from '../components/SearchBar';


export default function KastraLanding() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Create Profile",
      desc: "Build your creative identity with beautiful profiles"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Upload Works",
      desc: "Share your artistic masterpieces with the world"
    },
    {
      icon: <Grid3x3 className="w-6 h-6" />,
      title: "Organize Boards",
      desc: "Curate collections of your best work"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Save & Like",
      desc: "Discover and appreciate amazing creations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 modern-pattern">
      {/* Navigation */}
      <Navbar/>
   
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2 modern-gradient text-white rounded-full text-sm mb-6 modern-subtitle border border-indigo-200"
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            Creative Gallery Platform
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl font-bold mb-6 modern-title"
          >
            <span className="modern-text">Where Every Masterpiece</span>
            <span className="block text-indigo-600 mt-2">Lives Forever</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 modern-subtitle max-w-3xl mx-auto"
          >
            Showcase your creative works, organize them into beautiful collections, 
            and connect with a vibrant community of artists and creators.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/signup" className="px-8 py-4 modern-button text-white font-medium rounded-lg text-lg modern-subtitle">
                Start Creating
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/explore" className="px-8 py-4 modern-card text-gray-600 hover:text-indigo-600 font-medium rounded-lg text-lg modern-subtitle border border-gray-200 hover:border-indigo-200">
                Explore Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Preview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-6 justify-center mt-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            className="w-40 h-52 modern-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <Palette className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            className="w-40 h-52 modern-gradient-secondary rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
          >
            <Camera className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, y: -10 }}
            className="w-40 h-52 modern-gradient-accent rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-white to-slate-50 py-20 modern-pattern">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 modern-title"
          >
            <span className="modern-text">Features</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="modern-card p-6 rounded-xl border border-gray-200 hover:border-indigo-200 transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 modern-gradient rounded-lg flex items-center justify-center mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 modern-title">{feature.title}</h3>
                <p className="text-gray-600 text-sm modern-subtitle">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 modern-title"
          >
            <span className="modern-text">Categories</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="h-48 modern-gradient rounded-xl flex flex-col items-center justify-center shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <Palette className="w-10 h-10 mb-3 text-white" />
              <h3 className="text-xl font-bold text-white modern-title">Digital Art</h3>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="h-48 modern-gradient-secondary rounded-xl flex flex-col items-center justify-center shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300"
            >
              <Camera className="w-10 h-10 mb-3 text-white" />
              <h3 className="text-xl font-bold text-white modern-title">Photography</h3>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="h-48 modern-gradient-accent rounded-xl flex flex-col items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
            >
              <BookOpen className="w-10 h-10 mb-3 text-white" />
              <h3 className="text-xl font-bold text-white modern-title">Writing</h3>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="h-48 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex flex-col items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
            >
              <Zap className="w-10 h-10 mb-3 text-white" />
              <h3 className="text-xl font-bold text-white modern-title">Design</h3>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 modern-pattern">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-4 modern-title text-white"
            >
              <span>Ready to Start Creating?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-indigo-100 mb-8 modern-subtitle"
            >
              Join Kastra today and showcase your creative works in our beautiful digital gallery.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup" className="px-10 py-5 bg-white text-indigo-600 font-medium rounded-lg text-xl modern-subtitle shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center">
                  <Star className="w-6 h-6 inline mr-2" />
                  Create Your Gallery
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 modern-gradient rounded flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl modern-title">
                <span className="modern-text">Kastra</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm modern-subtitle">© 2025 Kastra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

