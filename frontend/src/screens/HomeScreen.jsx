// src/screens/HomeScreen.jsx
import React from 'react';
import '../App.css';

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <h2>Live Feed</h2>

      <div className="card video-card">
        <img
          src="/predict/video"
          alt="Live MJPEG Stream"
        />
      </div>
    </div>
  );
}
