import React from 'react'
import Navbar from '../components/Navbar'
import { useContext } from 'react';
import ContentInsights from '../components/ContentInsight'
import { authContext } from "../context/AuthContext";
import { useNavigate } from 'react-router';
const InsightPage = () => {
  const { user,token } = useContext(authContext);
  const navigate = useNavigate()
  if(!token) navigate('/')
  return (
    <div>
        <Navbar/>
        <ContentInsights userId={user?._id}/>
    </div>
  )
}

export default InsightPage