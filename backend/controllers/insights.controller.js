import mongoose from "mongoose";
import Content from "../models/content.model.js";

export const getUserAnalytics = async (req, res) => {
  console.log('=== ANALYTICS ENDPOINT CALLED ===');
  console.log('Request params:', req.params);
  console.log('Request query:', req.query);
  
  try {
    const { userId } = req.params;
    const { period } = req.query; // 'daily' | 'weekly' | 'monthly'

    console.log('Analytics request:', { userId, period });

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId provided:', userId);
      return res.status(400).json({ 
        message: "Invalid user ID", 
        timeline: [] 
      });
    }

    console.log('Validating MongoDB connection...');
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, readyState:', mongoose.connection.readyState);
      return res.status(500).json({ 
        message: "Database not connected", 
        timeline: [] 
      });
    }

    console.log('MongoDB connected, searching for user content...');
    // First check if user has any content
    const userContent = await Content.find({ owner: new mongoose.Types.ObjectId(userId) });
    console.log('User content count:', userContent.length);

    if (userContent.length === 0) {
      console.log('No content found for user, returning empty timeline');
      return res.json({ timeline: [] });
    }

    console.log('Building aggregation pipeline...');
    const pipeline = [
      { $match: { owner: new mongoose.Types.ObjectId(userId) } },
      { $unwind: { path: "$engagementHistory", preserveNullAndEmptyArrays: true } },
    ];

    // group stage based on the period type
    if (period === "weekly") {
      pipeline.push({
        $group: {
          _id: {
            year: { $year: "$engagementHistory.date" },
            week: { $week: "$engagementHistory.date" },
          },
          views: { $sum: { $ifNull: ["$engagementHistory.views", 0] } },
          likes: { $sum: { $ifNull: ["$engagementHistory.likes", 0] } },
          saves: { $sum: { $ifNull: ["$engagementHistory.saves", 0] } },
        },
      });
    } else if (period === "monthly") {
      pipeline.push({
        $group: {
          _id: {
            year: { $year: "$engagementHistory.date" },
            month: { $month: "$engagementHistory.date" },
          },
          views: { $sum: { $ifNull: ["$engagementHistory.views", 0] } },
          likes: { $sum: { $ifNull: ["$engagementHistory.likes", 0] } },
          saves: { $sum: { $ifNull: ["$engagementHistory.saves", 0] } },
        },
      });
    } else {
      // default: daily
      pipeline.push({
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$engagementHistory.date",
              },
            },
          },
          views: { $sum: { $ifNull: ["$engagementHistory.views", 0] } },
          likes: { $sum: { $ifNull: ["$engagementHistory.likes", 0] } },
          saves: { $sum: { $ifNull: ["$engagementHistory.saves", 0] } },
        },
      });
    }

    pipeline.push({ $sort: { "_id": 1 } });

    console.log('Executing aggregation pipeline...');
    console.log('Pipeline:', JSON.stringify(pipeline, null, 2));
    const analytics = await Content.aggregate(pipeline);
    console.log('Analytics result:', analytics);

    // Format result for frontend
    const timeline = analytics.map((a) => ({
      date:
        period === "monthly"
          ? `${a._id.month}-${a._id.year}`
          : period === "weekly"
          ? `Week ${a._id.week}-${a._id.year}`
          : a._id.date,
      views: a.views || 0,
      likes: a.likes || 0,
      saves: a.saves || 0,
    }));

    console.log('Formatted timeline:', timeline);
    console.log('Sending response...');
    
    // Ensure we always send a response
    const response = { timeline };
    console.log('Final response:', response);
    res.json(response);
    console.log('=== ANALYTICS ENDPOINT COMPLETED ===');
  } catch (err) {
    console.error('=== ANALYTICS ERROR ===');
    console.error('Analytics error:', err);
    console.error('Error stack:', err.stack);
    
    // Always send a response, even on error
    try {
      res.status(500).json({ 
        message: "Error fetching analytics", 
        error: err.message,
        timeline: []
      });
    } catch (responseError) {
      console.error('Failed to send error response:', responseError);
    }
  }
};

export const updateEngagement = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { type } = req.body; // 'view', 'like', 'save'

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Find today's engagement record
    let todayEngagement = content.engagementHistory.find(
      (engagement) => engagement.date.getTime() === today.getTime()
    );

    if (!todayEngagement) {
      // Create new engagement record for today
      todayEngagement = {
        date: today,
        views: 0,
        likes: 0,
        saves: 0,
      };
      content.engagementHistory.push(todayEngagement);
    }

    // Update the appropriate metric
    if (type === 'view') {
      todayEngagement.views += 1;
      content.views += 1;
    } else if (type === 'like') {
      todayEngagement.likes += 1;
    } else if (type === 'save') {
      todayEngagement.saves += 1;
    }

    await content.save();
    res.json({ message: "Engagement updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating engagement" });
  }
};