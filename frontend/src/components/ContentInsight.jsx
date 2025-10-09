import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye, ThumbsUp, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function ContentInsights({ userId }) {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalViews: 0, totalLikes: 0, totalSaves: 0 });

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    console.log('ContentInsights - userId received:', userId);
    console.log('ContentInsights - userId type:', typeof userId);
    
    // Validate userId before making API call
    if (!userId) {
      console.log('No userId provided, skipping analytics fetch');
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    if (typeof userId !== 'string' || userId.trim() === '') {
      console.log('Invalid userId format:', userId);
      setError('Invalid user ID format');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    const fetchAnalytics = async () => {
      try {
        // First test if the analytics API is accessible
        console.log('Testing analytics API connectivity...');
        const testRes = await axios.get(`${API_URL}/api/analytics/test`, {
          withCredentials: true
        });
        console.log('Test endpoint working:', testRes.data);
        
        // Now try the actual analytics endpoint
        console.log('Fetching analytics for user:', userId, 'period:', period);
        const res = await axios.get(`${API_URL}/api/analytics/user/${userId}?period=${period}`, {
          withCredentials: true
        });
        
        console.log('Analytics response:', res.data);
        
        if (!res.data.timeline) {
          throw new Error('Invalid response format: missing timeline');
        }
        
        setData(res.data.timeline);
        const totals = res.data.timeline.reduce(
          (acc, item) => ({
            totalViews: acc.totalViews + (item.views || 0),
            totalLikes: acc.totalLikes + (item.likes || 0),
            totalSaves: acc.totalSaves + (item.saves || 0),
          }),
          { totalViews: 0, totalLikes: 0, totalSaves: 0 }
        );
        setStats(totals);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(`Error: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId, period, API_URL]);

  const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="modern-card rounded-xl shadow-lg p-6 flex items-center gap-4 border-l-4 modern-pattern relative" 
      style={{ borderColor: color }}
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        style={{ backgroundColor: `${color}15` }} 
        className="p-3 rounded-lg border border-gray-200"
      >
        <Icon style={{ color }} size={24} />
      </motion.div>
      <div>
        <p className="text-gray-600 text-sm modern-subtitle">{label}</p>
        <p className="text-2xl font-bold text-gray-900 modern-title">{value.toLocaleString()}</p>
      </div>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="modern-card p-3 rounded-lg shadow-lg border border-gray-200"
        >
          <p className="text-sm font-semibold text-gray-900 modern-subtitle">{payload[0].payload.date}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm modern-subtitle">
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 modern-pattern">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 modern-title">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <TrendingUp className="text-indigo-600" size={32} />
              </motion.div>
              <span className="modern-text">Content Insights</span>
            </h1>
            <p className="text-gray-600 mt-1 modern-subtitle">Track your content performance with beautiful analytics</p>
          </div>
        </motion.div>

        {/* Period Selector */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-3 mb-8"
        >
          {['daily', 'weekly', 'monthly'].map((p, index) => (
            <motion.button
              key={p}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all modern-subtitle ${
                period === p
                  ? 'modern-button text-white shadow-lg'
                  : 'modern-card text-gray-600 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Eye}
            label="Total Views"
            value={stats.totalViews}
            color="#6366f1"
            delay={0.1}
          />
          <StatCard
            icon={ThumbsUp}
            label="Total Likes"
            value={stats.totalLikes}
            color="#f59e0b"
            delay={0.2}
          />
          <StatCard
            icon={Bookmark}
            label="Total Saves"
            value={stats.totalSaves}
            color="#10b981"
            delay={0.3}
          />
        </div>

        {/* Charts */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modern-card rounded-xl shadow-lg p-12 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"
              />
              <p className="text-gray-600 modern-subtitle">Loading analytics...</p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="modern-card rounded-xl shadow-lg p-8 border-l-4 border-red-500"
          >
            <p className="text-red-600 font-semibold modern-subtitle">Error loading analytics</p>
            <p className="text-gray-600 text-sm mt-1">{error}</p>
          </motion.div>
        ) : data.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="modern-card rounded-xl shadow-lg p-12 text-center"
          >
            <p className="text-gray-600 modern-subtitle">No data available for the selected period</p>
          </motion.div>
        ) : (
          <>
            {/* Line Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="modern-chart rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 modern-title">Performance Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#6366f1" }}
                    activeDot={{ r: 6, fill: "#6366f1" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="likes"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f59e0b" }}
                    activeDot={{ r: 6, fill: "#f59e0b" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="saves"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#10b981" }}
                    activeDot={{ r: 6, fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="modern-chart rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 modern-title">Engagement Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="views" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="likes" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="saves" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}