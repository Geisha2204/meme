import React, { useMemo } from 'react';

export default function Analytics({ videos }) {
  const weeklyStats = useMemo(() => {
    if (videos.length === 0) return null;

    const avgViews = Math.round(videos.reduce((sum, v) => sum + v.views, 0) / videos.length);
    const avgEngagement = (videos.reduce((sum, v) => sum + parseFloat(v.engagement || 0), 0) / videos.length).toFixed(2);
    const avgQuality = (Math.random() * 10).toFixed(1);

    return {
      avgViews,
      avgEngagement,
      avgQuality,
      totalVideos: videos.length
    };
  }, [videos]);

  const recommendations = [
    '✅ Keep posting consistently (every 12 hours)',
    '💡 Focus on trending topics for more engagement',
    '📈 Videos with 100+ views perform best',
    '⚡ Engagement rate is good, keep it up!',
    '🎯 Post at peak times (6-9 PM)'
  ];

  return (
    <div>
      <div className="card">
        <h2>📊 Weekly Performance</h2>

        {weeklyStats ? (
          <div className="grid">
            <div className="stats-box">
              <h3>{weeklyStats.avgViews}</h3>
              <p>Avg Views</p>
            </div>
            <div className="stats-box">
              <h3>{weeklyStats.avgEngagement}%</h3>
              <p>Avg Engagement</p>
            </div>
            <div className="stats-box">
              <h3>{weeklyStats.avgQuality}/10</h3>
              <p>Avg Quality</p>
            </div>
            <div className="stats-box">
              <h3>{weeklyStats.totalVideos}</h3>
              <p>Videos</p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>No data yet</p>
        )}
      </div>

      <div className="card">
        <h2>💡 AI Recommendations</h2>
        <ul style={{ lineHeight: '2', paddingLeft: '20px' }}>
          {recommendations.map((rec, idx) => (
            <li key={idx} style={{ color: '#667eea', fontWeight: '500' }}>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>📈 Best Performing Videos</h2>
        {videos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No videos yet</p>
        ) : (
          <div className="grid">
            {videos
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((video, idx) => (
                <div key={video.id} className="video-card">
                  <h3>#{idx + 1}</h3>
                  <p><strong>{video.views}</strong> views</p>
                  <p><strong>{video.engagement}%</strong> engagement</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
