import React, { useState, useEffect } from 'react';
import './index.css';
import MemeGenerator from './pages/MemeGenerator';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState('generate');
  const [memes, setMemes] = useState([]);
  const [videos, setVideos] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedMemes = localStorage.getItem('memes');
    const savedVideos = localStorage.getItem('videos');
    if (savedMemes) setMemes(JSON.parse(savedMemes));
    if (savedVideos) setVideos(JSON.parse(savedVideos));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('memes', JSON.stringify(memes));
  }, [memes]);

  useEffect(() => {
    localStorage.setItem('videos', JSON.stringify(videos));
  }, [videos]);

  return (
    <div className="container">
      <div className="navbar">
        <h1>🎬 Meme Automation</h1>
        <div className="nav-links">
          <button 
            className={currentPage === 'generate' ? 'button' : 'button button-secondary'}
            onClick={() => setCurrentPage('generate')}
          >
            Generate
          </button>
          <button 
            className={currentPage === 'dashboard' ? 'button' : 'button button-secondary'}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentPage === 'analytics' ? 'button' : 'button button-secondary'}
            onClick={() => setCurrentPage('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {currentPage === 'generate' && (
        <MemeGenerator memes={memes} setMemes={setMemes} setVideos={setVideos} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard videos={videos} setVideos={setVideos} />
      )}
      {currentPage === 'analytics' && (
        <Analytics videos={videos} />
      )}
    </div>
  );
}
