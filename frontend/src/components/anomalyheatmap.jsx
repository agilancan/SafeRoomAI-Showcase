import React from 'react';
import '../App.css';

const AnomalyHeatmap = () => {
  return (
    <div className="h-40 flex flex-wrap gap-2">
      {Array.from({ length: 24 }, (_, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded bg-red-500/30 hover:bg-red-500"
          title={`Hour ${i}: ${Math.floor(Math.random() * 5)} anomalies`}
        ></div>
      ))}
    </div>
  );
};

export default AnomalyHeatmap;
