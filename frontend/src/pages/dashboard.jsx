import React from 'react';
import AnomalyChart from '../components/AnomalyChart';
import AnomalyHeatmap from '../components/AnomalyHeatmap';
import AnomalySnapshots from '../components/AnomalySnapshots';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">SafeRoom AI Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Anomalies Over Time</h2>
          <AnomalyChart />
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Activity Heatmap</h2>
          <AnomalyHeatmap />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Recent Anomalous Events</h2>
        <AnomalySnapshots />
      </div>
    </div>
  );
};

export default Dashboard;
