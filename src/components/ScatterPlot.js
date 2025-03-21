// ScatterPlot.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

const ScatterPlot = ({ data, regressionLine }) => {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Scatter data={data} fill="blue" />
      <Line type="monotone" data={regressionLine} dataKey="y" stroke="red" />
    </LineChart>
  );
};

export default ScatterPlot;
