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
app.use(cors({
  origin: process.env.FRONTEND_URL, // frontend
  credentials: true,               // allow sending cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});


// import routes
import authRoutes from "./routes/auth.route.js"
import collectionRouter from './routes/collection.route.js'
import mediaRoutes from './routes/media.routes.js'
import uploadRoutes from './routes/upload.route.js'
import searchRoutes from './routes/search.routes.js'


// api endpoints
app.use("/api/auth", authRoutes);
app.use("/api/content", uploadRoutes);
app.use("/api/media",mediaRoutes);
app.use("/api/collections",collectionRouter)
app.use("/api/search",searchRoutes);

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