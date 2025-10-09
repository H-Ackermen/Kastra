import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye, ThumbsUp, Bookmark } from 'lucide-react';
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

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4 border-l-4" style={{ borderColor: color }}>
      <div style={{ backgroundColor: `${color}20` }} className="p-3 rounded-lg">
        <Icon style={{ color }} size={24} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">{payload[0].payload.date}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={32} />
              Content Insights
            </h1>
            <p className="text-gray-600 mt-1">Track your content performance</p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-3 mb-8">
          {['daily', 'weekly', 'monthly'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                period === p
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Eye}
            label="Total Views"
            value={stats.totalViews}
            color="#3b82f6"
          />
          <StatCard
            icon={ThumbsUp}
            label="Total Likes"
            value={stats.totalLikes}
            color="#ef4444"
          />
          <StatCard
            icon={Bookmark}
            label="Total Saves"
            value={stats.totalSaves}
            color="#f59e0b"
          />
        </div>

        {/* Charts */}
        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Loading analytics...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow p-8 border-l-4 border-red-500">
            <p className="text-red-600 font-semibold">Error loading analytics</p>
            <p className="text-gray-600 text-sm mt-1">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">No data available for the selected period</p>
          </div>
        ) : (
          <>
            {/* Line Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="likes"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="saves"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="likes" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="saves" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}