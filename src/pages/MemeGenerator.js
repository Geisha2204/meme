import React, { useState } from 'react';

const N8N_WEBHOOK = process.env.REACT_APP_N8N_WEBHOOK || '';

export default function MemeGenerator({ memes, setMemes, setVideos }) {
  const [memeIdea, setMemeIdea] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [generatedMeme, setGeneratedMeme] = useState(null);

  // Generate Meme (Mock - replace with actual API call)
  const generateMeme = async () => {
    if (!memeIdea.trim()) {
      setMessage('Please enter a meme idea');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Mock response (replace with actual n8n webhook)
      const mockMeme = {
        id: Date.now(),
        idea: memeIdea,
        imageUrl: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(memeIdea.substring(0, 20)),
        caption: memeIdea,
        score: Math.floor(Math.random() * 10) + 1,
        createdAt: new Date().toISOString()
      };

      setGeneratedMeme(mockMeme);
      setMemes([...memes, mockMeme]);
      setMessage('✅ Meme generated successfully!');
      setMemeIdea('');
      setSuggestion('');
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Create Video
  const createVideo = async (memeId) => {
    setLoading(true);
    setMessage('');

    try {
      const meme = memes.find(m => m.id === memeId);
      
      const video = {
        id: Date.now(),
        memeId: memeId,
        videoUrl: '#',
        title: `Meme Video ${new Date().toLocaleDateString()}`,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: 0,
        engagement: 0
      };

      setVideos(prev => [...prev, video]);
      setMessage('✅ Video created! Ready to upload to YouTube');
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>🎨 Generate Meme</h2>
        
        {message && (
          <div className={message.includes('✅') ? 'success' : 'error'}>
            {message}
          </div>
        )}

        <div className="input-group">
          <label>Meme Idea (trending topic, current event, humor)</label>
          <textarea
            value={memeIdea}
            onChange={(e) => setMemeIdea(e.target.value)}
            placeholder="e.g., Gen Z buying coffee trends, crypto jokes, office memes..."
            rows="3"
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Suggestions for AI (optional)</label>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Any specific changes you want? AI will adjust..."
            rows="2"
            disabled={loading}
          />
        </div>

        <button 
          className="button" 
          onClick={generateMeme}
          disabled={loading}
        >
          {loading ? '⏳ Generating...' : '✨ Generate Meme'}
        </button>
      </div>

      {generatedMeme && (
        <div className="card">
          <h2>👀 Preview</h2>
          <div className="meme-preview">
            <img src={generatedMeme.imageUrl} alt="Generated Meme" />
          </div>
          <div className="meme-info">
            <p><strong>Idea:</strong> {generatedMeme.idea}</p>
            <p><strong>Caption:</strong> {generatedMeme.caption}</p>
            <p><strong>Quality Score:</strong> {generatedMeme.score}/10</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="button"
              onClick={() => createVideo(generatedMeme.id)}
              disabled={loading}
            >
              {loading ? '⏳ Creating Video...' : '🎬 Create Video'}
            </button>
            <button 
              className="button button-secondary"
              onClick={() => setGeneratedMeme(null)}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h2>📚 Recent Memes ({memes.length})</h2>
        {memes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No memes generated yet</p>
        ) : (
          <div className="grid">
            {memes.slice(-6).reverse().map(meme => (
              <div key={meme.id} className="video-card">
                <img src={meme.imageUrl} alt="Meme" />
                <p><strong>Score:</strong> {meme.score}/10</p>
                <p style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(meme.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
