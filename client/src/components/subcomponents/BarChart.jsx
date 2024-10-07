import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({features}) => {
  // Data for the chart
  const data = {
    labels: ['Energy', 'Acousticness', 'Danceability', 'Instrumentalness', 'Speechiness', 'Valence'], // X-axis labels
    datasets: [
      {
        // label: 'Sales',
        data: [features.energy, features.acousticness, features.danceability, features.instrumentalness, features.speechiness, features.valence], // Values for each bar
        backgroundColor: '#1db954', // Bar color
        borderColor: '#000000', // Border color
        borderWidth: 0.5, // Border width of bars
        // barThickness: 20, // Width of bars
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
        position: 'topleft',
      },
      title: {
        display: true,
        text: 'Audio Features',
        position: 'top',
        font: {
            family: 'Plus Jakarta Sans',
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at zero
        ticks: {
          font: {
            family: 'Plus Jakarta Sans',
          },
        },
     },
      x: {
        max: 1,
        ticks: {
          font: {
            family: 'Plus Jakarta Sans',
          },
        },
      },
    },
  };

  return (
      <Bar data={data} options={options} />
  );
};

export default BarChart;
