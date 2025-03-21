import React, { useState } from 'react';
import './App.css';
import RegressionChart from './components/RegressionChart';

const App = () => {
  const [data, setData] = useState([]);
  const [slope, setSlope] = useState(null);
  const [intercept, setIntercept] = useState(null);
  
  // Handle user input for regression data
  const handleInputChange = (e) => {
    const input = e.target.value;
    const parsedData = input.split('\n').map(line => {
      const [x, y] = line.split(',').map(Number);
      return { x, y };
    });
    setData(parsedData);
  };

  // Simple linear regression calculation
  const calculateRegression = () => {
    if (data.length < 2) return;
    
    let n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    data.forEach(point => {
      sumX += point.x;
      sumY += point.y;
      sumXY += point.x * point.y;
      sumX2 += point.x * point.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    setSlope(slope);
    setIntercept(intercept);
  };

  return (
    <div className="App">
      <h1>Regression Visualization</h1>
      <textarea
        onChange={handleInputChange}
        placeholder="Enter data as 'x,y' pairs, one per line"
        rows={10}
        cols={30}
      />
      <button onClick={calculateRegression}>Calculate Regression</button>
      <div>
        {slope && intercept ? (
          <p>Regression Line: y = {slope.toFixed(2)}x + {intercept.toFixed(2)}</p>
        ) : (
          <p>Enter data to calculate regression.</p>
        )}
      </div>
      <RegressionChart data={data} slope={slope} intercept={intercept} />
    </div>
  );
}

export default App;