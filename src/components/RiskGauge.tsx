import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface RiskGaugeProps {
  score: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  // Color logic based on score
  let color = '#22c55e'; // Green
  let label = 'Safe';
  
  if (score > 40) {
    color = '#eab308'; // Yellow
    label = 'Caution';
  }
  if (score > 70) {
    color = '#ef4444'; // Red
    label = 'Risky';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">Overall Risk Score</h3>
      <div className="relative w-48 h-24 overflow-hidden">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="cell-0" fill={color} />
              <Cell key="cell-1" fill="#e2e8f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 left-0 w-full text-center">
             <span className={`text-3xl font-bold`} style={{ color }}>{score}</span>
             <span className="text-slate-400 text-sm">/100</span>
        </div>
      </div>
      <div className={`mt-2 font-semibold px-3 py-1 rounded-full text-sm`} style={{ backgroundColor: `${color}20`, color: color }}>
        {label}
      </div>
    </div>
  );
};

export default RiskGauge;