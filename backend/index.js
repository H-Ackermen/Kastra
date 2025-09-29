import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import { connectCloudinary } from './config/connectCloudinary.js'


// app config
const app = express()
const PORT = process.env.PORT || 4000



// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// api endpoints

// Start Server
const startServer = async () => {
  try {
    await connectDB()
    connectCloudinary()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    });
  } catch (err) {
    console.error("Failed to start server:", err.message)
  }
};

startServer()