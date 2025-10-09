// utils/engagement.js
import Content from "../models/content.model.js";

/**
 * Returns start-of-day UTC date
 */
function getStartOfDayUTC(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

/**
 * Update today's engagement for content.
 * @param {String} contentId - ID of content
 * @param {Object} deltas - { views: Number, likes: Number, saves: Number }
 */
export async function updateDailyEngagement(contentId, { views = 0, likes = 0, saves = 0 } = {}) {
  const day = getStartOfDayUTC();

  const incObj = {};
  if (views) incObj["engagementHistory.$.views"] = views;
  if (likes) incObj["engagementHistory.$.likes"] = likes;
  if (saves) incObj["engagementHistory.$.saves"] = saves;

  if (Object.keys(incObj).length === 0) return;
  
  //increment existing today's record
  const res = await Content.updateOne(
    { _id: contentId, "engagementHistory.date": day },
    { $inc: incObj }
  );

  // 2) If no record exists, push a new one
  if ((res.matchedCount === 0 || res.modifiedCount === 0) && (views > 0 || likes > 0 || saves > 0)) {
    const newRecord = { date: day, views: Math.max(0, views), likes: Math.max(0, likes), saves: Math.max(0, saves) };
    await Content.updateOne({ _id: contentId }, { $push: { engagementHistory: newRecord } });
  }
}
