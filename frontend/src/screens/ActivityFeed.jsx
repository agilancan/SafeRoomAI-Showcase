// src/screens/ActivityFeed.jsx
import React, { useState, useEffect } from 'react';
import '../App.css';

export default function ActivityFeed() {
  const [files, setFiles] = useState([]);      
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch('/predict/activity/list');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setFiles(data);
          setError(null);
        } else {
          console.warn('Expected an array but got:', data);
          setFiles([]);
          setError('No activity found.');
        }
      } catch (e) {
        console.error('Error fetching activity list:', e);
        setFiles([]);
        setError('Failed to load activity.');
      }
    }

    // Initial fetch + auto-refresh every 5s
    fetchList();
    const interval = setInterval(fetchList, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="activity-feed">
      <h2>Activity Feed</h2>

      {error && <p className="error-text">{error}</p>}

      {files.length === 0 && !error ? (
        <p>No activity snapshots yet.</p>
      ) : (
        <div className="activity-grid">
          {files.map((fname) => {
            // Extract "YYYYMMDD-HHMMSS" from the first 15 chars
            const prefix = fname.slice(0, 15);
            // Reformat to "YYYY-MM-DDTHH:MM:SS"
            const iso =
              `${prefix.slice(0, 4)}-${prefix.slice(4, 6)}-${prefix.slice(6, 8)}T` +
              `${prefix.slice(9, 11)}:${prefix.slice(11, 13)}:${prefix.slice(13, 15)}`;
            const displayTime = new Date(iso).toLocaleString();

            return (
              <div key={fname} className="activity-item">
                <img
                  src={`/predict/activity/${fname}`}
                  alt={`Anomaly at ${displayTime}`}
                  className="activity-image"
                />
                <p className="activity-timestamp">{displayTime}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
