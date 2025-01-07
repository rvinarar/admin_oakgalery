import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required elements and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GrafikDummy() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/grafik/data')
      .then(response => {
        console.log('Data fetched:', response.data);
        setChartData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Grafik</h1>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}

export default GrafikDummy;
