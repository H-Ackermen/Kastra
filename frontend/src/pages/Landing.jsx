import React from 'react';
import { Camera, Palette, BookOpen, Sparkles, Users, Heart, Grid3x3 } from 'lucide-react';

export default function KastraLanding() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Create Profile",
      desc: "Sign up and build your creative profile"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Upload Works",
      desc: "Share your art, photos, and writing"
    },
    {
      icon: <Grid3x3 className="w-6 h-6" />,
      title: "Organize Boards",
      desc: "Create collections of your best work"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Save & Like",
      desc: "Bookmark and appreciate others' work"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Kastra</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-300 hover:text-white">Explore</a>
            <a href="#" className="text-gray-300 hover:text-white">About</a>
            <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-purple-900 text-purple-300 rounded-full text-sm mb-6">
            Grand Gallery of Wonders
          </span>
          
          <h1 className="text-5xl font-bold mb-6">
            Where Every Masterpiece
            <span className="block text-purple-400">Lives Forever</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            Showcase your creative works, organize them into collections, 
            and connect with other artists.
          </p>

          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700">
              Get Started
            </button>
            <button className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700">
              Learn More
            </button>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="flex gap-6 justify-center mt-16">
          <div className="w-40 h-52 bg-purple-600 rounded-lg flex items-center justify-center">
            <Palette className="w-12 h-12" />
          </div>
          <div className="w-40 h-52 bg-blue-600 rounded-lg flex items-center justify-center">
            <Camera className="w-12 h-12" />
          </div>
          <div className="w-40 h-52 bg-pink-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-12 h-12" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="p-6 bg-slate-900 rounded-lg border border-slate-700">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="h-48 bg-purple-600 rounded-lg flex flex-col items-center justify-center">
              <Palette className="w-10 h-10 mb-3" />
              <h3 className="text-xl font-bold">Digital Art</h3>
            </div>
            <div className="h-48 bg-blue-600 rounded-lg flex flex-col items-center justify-center">
              <Camera className="w-10 h-10 mb-3" />
              <h3 className="text-xl font-bold">Photography</h3>
            </div>
            <div className="h-48 bg-pink-600 rounded-lg flex flex-col items-center justify-center">
              <BookOpen className="w-10 h-10 mb-3" />
              <h3 className="text-xl font-bold">Writing</h3>
            </div>
            <div className="h-48 bg-indigo-600 rounded-lg flex flex-col items-center justify-center">
              <Sparkles className="w-10 h-10 mb-3" />
              <h3 className="text-xl font-bold">Design</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Creating?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join Kastra today and preserve your creative works forever.
            </p>
            <button className="px-8 py-4 bg-purple-600 rounded-lg hover:bg-purple-700 text-lg">
              Create Your Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold">Kastra</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Kastra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

