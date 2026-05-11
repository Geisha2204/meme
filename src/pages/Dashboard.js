import React, { useState, useEffect } from 'react';

export default function Dashboard({ videos, setVideos }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Update video stats every 2 hours (mock)
  useEffect(() => {
    const interval = setInterval(() => {
      setVideos(prev => prev.map(v => ({
        ...v,
        views: v.views + Math.floor(Math.random() * 10),
        likes: v.likes + Math.floor(Math.random() * 5),
        comments: v.comments + Math.floor(Math.random() * 2),
        engagement: ((v.likes + v.comments) / (v.views || 1) * 100).toFixed(2)
      })));
    }, 2 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [setVideos]);

  const uploadToYouTube = async (videoId) => {
    setLoading(true);
    setMessage('');

    try {
      // Mock upload
      setVideos(prev => prev.map(v => 
        v.id === videoId 
          ? { ...v, youtubeUrl: `https://youtube.com/shorts/${Date.now()}` }
          : v
      ));
      setMessage('✅ Video uploaded to YouTube Shorts!');
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>🎥 Video Dashboard</h2>
        
        {message && (
          <div className={message.includes('✅') ? 'success' : 'error'}>
            {message}
          </div>
        )}

        {videos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No videos yet. Generate some memes first!</p>
        ) : (
          <div className="grid">
            {videos.map(video => (
              <div key={video.id} className="card" style={{ background: '#f9f9f9' }}>
                <h3>{video.title}</h3>
                
                <div style={{ margin: '15px 0' }}>
                  <div className="stats-box">
                    <h3>{video.views}</h3>
                    <p>Views</p>
                  </div>
                  <div className="stats-box">
                    <h3>{video.likes}</h3>
                    <p>Likes</p>
                  </div>
                  <div className="stats-box">
                    <h3>{video.engagement}%</h3>
                    <p>Engagement</p>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#999' }}>
                  Created: {new Date(video.createdAt).toLocaleString()}
                </p>

                {!video.youtubeUrl && (
                  <button 
                    className="button"
                    onClick={() => uploadToYouTube(video.id)}
                    disabled={loading}
                  >
                    {loading ? '⏳ Uploading...' : '📤 Upload to YouTube'}
                  </button>
                )}

                {video.youtubeUrl && (
                  <p style={{ color: '#51cf66', fontWeight: 'bold' }}>✅ Uploaded</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
