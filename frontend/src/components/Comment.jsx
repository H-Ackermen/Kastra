import React from 'react'
import {Trash} from 'lucide-react';
const Comment = () => {
  return (
    <div className='w-full h-10 text-white  border-gray-500  p-2 border-b justify-between border-gray-300 flex '>
        <p  className = 'text-white'>wow very beautiful....</p>
       <Trash className = 'text-red-800 text-2xl'></Trash>
    </div>
  )
}

export default Comment
