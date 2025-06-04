// src/screens/Analytics.jsx
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import '../App.css';

export default function Analytics() {
  const [summary, setSummary] = useState([]);
  const [errors, setErrors] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch anomalies‐per‐minute summary
        const res1 = await fetch('/predict/analytics/summary');
        if (!res1.ok) throw new Error(`Summary HTTP ${res1.status}`);
        const summaryJson = await res1.json();
        if (summaryJson && typeof summaryJson === 'object' && !Array.isArray(summaryJson)) {
          const summaryArr = Object.entries(summaryJson).map(([time, count]) => ({ time, count }));
          setSummary(summaryArr);
        } else {
          setSummary([]);
        }

        // Fetch recent reconstruction errors
        const res2 = await fetch('/predict/analytics/errors');
        if (!res2.ok) throw new Error(`Errors HTTP ${res2.status}`);
        const errorsJson = await res2.json();
        if (Array.isArray(errorsJson)) {
          setErrors(errorsJson);
        } else {
          setErrors([]);
        }

        setErrorMsg(null);
      } catch (e) {
        console.error('Analytics fetch error:', e);
        setErrorMsg('Failed to load analytics data.');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="analytics-screen">
      <h2>Analytics Dashboard</h2>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      {/* ──── Anomalies per Minute Chart ──────────────────────────────── */}
      <div className="card chart-container">
        <h3>Anomalies per Minute</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={summary}>
            <XAxis
              dataKey="time"
              tickFormatter={(t) =>
                new Date(t).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
              stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color')}
            />
            <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color')} />
            <Tooltip labelFormatter={(l) => new Date(l).toLocaleString()} />
            <Line type="monotone" dataKey="count" stroke={getComputedStyle(document.documentElement).getPropertyValue('--accent-color')} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ──── Reconstruction Error Distribution ──────────────────────────── */}
      <div className="card chart-container">
        <h3>Reconstruction Error Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={errors.map((e, i) => ({ index: i, value: e }))}>
            <XAxis dataKey="index" hide={true} />
            <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-color')} />
            <Tooltip />
            <Bar dataKey="value" fill={getComputedStyle(document.documentElement).getPropertyValue('--accent-color')} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
