import React from 'react';

const snapshots = [
  { id: 1, time: '12:01 PM', img: '/snap1.jpg' },
  { id: 2, time: '12:07 PM', img: '/snap2.jpg' },
  { id: 3, time: '12:15 PM', img: '/snap3.jpg' },
];

const AnomalySnapshots = () => {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {snapshots.map((snap) => (
        <div key={snap.id} className="min-w-[150px] text-center">
          <img
            src={snap.img}
            alt={`Anomaly at ${snap.time}`}
            className="rounded shadow w-full h-24 object-cover"
          />
          <div className="mt-1 text-sm">{snap.time}</div>
        </div>
      ))}
    </div>
  );
};

export default AnomalySnapshots;
