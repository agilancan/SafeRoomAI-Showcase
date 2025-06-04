import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend);

const AnomalyChart = () => {
  const data = {
    labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM'],
    datasets: [
      {
        label: 'Anomalies Detected',
        data: [1, 3, 2, 5, 2, 4],
        borderColor: '#ef4444',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
};

export default AnomalyChart;
