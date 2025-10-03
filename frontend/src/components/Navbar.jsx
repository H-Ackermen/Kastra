import React from 'react'


import { Sparkles } from 'lucide-react'


import { Link } from 'react-router'


export default function Navbar()


{


    return (


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


            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>


            <Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link>


          </div>


        </div>


      </nav>


    )


}