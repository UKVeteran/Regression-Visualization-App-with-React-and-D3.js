import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RegressionChart = ({ data, slope, intercept }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const width = 500;
    const height = 500;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) - 1, d3.max(data, d => d.x) + 1])
      .range([50, width - 50]);
    
    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y) - 1, d3.max(data, d => d.y) + 1])
      .range([height - 50, 50]);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear previous renderings

    // Plot data points
    svg.selectAll('circle')
      .data(data)
      .enter().append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'blue');

    // Plot regression line
    if (slope !== null && intercept !== null) {
      const lineData = [
        { x: d3.min(data, d => d.x), y: slope * d3.min(data, d => d.x) + intercept },
        { x: d3.max(data, d => d.x), y: slope * d3.max(data, d => d.x) + intercept }
      ];

      svg.append('line')
        .attr('x1', xScale(lineData[0].x))
        .attr('y1', yScale(lineData[0].y))
        .attr('x2', xScale(lineData[1].x))
        .attr('y2', yScale(lineData[1].y))
        .attr('stroke', 'red')
        .attr('stroke-width', 2);
    }

    // Axis
    svg.append('g')
      .attr('transform', `translate(0,${height - 50})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(50,0)`)
      .call(d3.axisLeft(yScale));
  }, [data, slope, intercept]);

  return (
    <svg ref={svgRef}></svg>
  );
}

export default RegressionChart;
