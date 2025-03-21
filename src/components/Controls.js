// Controls.js
import React, { useState } from 'react';
import InputForm from './InputForm'; // Component for adding data points
import calculateRegression from './RegressionLine'; // Function to calculate regression stats

const Controls = ({ onDataChange }) => {
  const [data, setData] = useState([]);

  const addDataPoint = (point) => {
    const updatedData = [...data, point];
    setData(updatedData);
    const regressionStats = calculateRegression(updatedData);
    onDataChange(updatedData, regressionStats);
  };

  return (
    <div>
      <h3>Enter Data Points</h3>
      <InputForm onSubmit={addDataPoint} />
    </div>
  );
};

export default Controls;
