import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react';
import ContentInsights from '../components/ContentInsight'
import { authContext } from "../context/AuthContext";
const InsightPage = () => {
  const { user } = useContext(authContext);
  return (
    <div>
        <Navbar/>
        <ContentInsights userId={user?._id}/>
    </div>
  )
}

export default InsightPage