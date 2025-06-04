<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DarkModeToggle from './components/DarkModeToggle';
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';
import ActivityFeed from './screens/ActivityFeed';
import Analytics from './screens/Analytics';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>SafeRoom AI</h1>
          <DarkModeToggle
            darkMode={darkMode}
            onToggle={() => setDarkMode(!darkMode)}
          />
        </header>

        <NavBar />

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/activity" element={<ActivityFeed />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
>>>>>>> 853ce1311d72981a9a797eec50399e3183e5f643
  );
}

export default App;
