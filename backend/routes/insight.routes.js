import express from "express";
import { getUserAnalytics } from "../controllers/insights.controller.js";
import { updateEngagement } from "../controllers/insights.controller.js";

const router = express.Router();

// Test endpoint to verify the route is working
router.get("/test", (req, res) => {
  console.log("Test endpoint called!");
  res.json({ message: "Analytics route is working!", timestamp: new Date().toISOString() });
});

// Fallback for any analytics route
router.get("/", (req, res) => {
  console.log("Analytics root endpoint called!");
  res.json({ message: "Analytics API is working", availableEndpoints: ["/test", "/user/:userId"] });
});

router.get("/user/:userId", getUserAnalytics); //query whery perid=daily,weekly,monthly
router.post("/content/:contentId/engagement", updateEngagement);

export default router;
