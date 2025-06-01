// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/activity" className="nav-link">Activity Feed</Link>
      <Link to="/analytics" className="nav-link">Analytics</Link>
    </nav>
  );
}
