import React, { use } from 'react'
import { useState } from 'react'
import UploadContent from './UploadContent';
import AddCollection from './AddCollection';

const NavigationMenu = ( { activebtn, setActivebtn }) => {
    
    const handlebtn1=()=>{
        if(activebtn==="mycontent")
        {
            setActivebtn("");
        }
        else
        {
            setActivebtn("mycontent");
        }
    }
    const handlebtn2=()=>{
        if(activebtn==="mycollection")
        {
            setActivebtn("");
        }
        else 
        {
            setActivebtn("mycollection");
        }
    }
    const handlebtn3=()=>{
        if(activebtn==="mysaved")
        {
            setActivebtn("");
        }
        else
        {
            setActivebtn("mysaved");
        }
    }

  return (
    <div className='w-full flex  items-center  justify-between h-20 rounded-2xl'>
        <div flex className='flex items-center justify-center'>
            <button  onClick={handlebtn1}  className={`bg-[#a855f7] w-40 hover:bg-[#3b82f6] px-6 py-2 rounded-lg m-4  ${activebtn==="mycontent" ? "bg-purple-800" : ""}`}>My Content</button>
        <button  onClick={handlebtn2}  className={`bg-[#a855f7] w-40 hover:bg-[#3b82f6] px-6 py-2 rounded-lg m-4  ${activebtn==="mycollection" ? "bg-purple-800" : ""}`}>My Collection</button>
        <button  onClick={handlebtn3}  className={`bg-[#a855f7] w-40 hover:bg-[#3b82f6] px-6 py-2 rounded-lg m-4  ${activebtn==="mysaved" ? "bg-purple-800" : ""}`}>My Saved</button>
        </div>
        <div>
    {
            activebtn==="mycollection" ?<AddCollection />  : <UploadContent />
        }
        </div>
    </div>
  )
}

export default NavigationMenu