import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ features }) => {
  // Data for the chart
  const data = {
    labels: [
      "Valence",
      "Energy",
      "Danceability",
      "Instrumentalness",
      "Speechiness",
      "Acousticness",
    ], // X-axis labels
    datasets: [
      {
        // label: 'Sales',
        data: [
          features.valence,
          features.energy,
          features.danceability,
          features.instrumentalness,
          features.speechiness,
          features.acousticness,
        ], // Values for each bar
        backgroundColor: "#1db954", // Bar color
        borderColor: "#000000", // Border color
        borderWidth: 0.5, // Border width of bars
        // barThickness: 20, // Width of bars
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    borderRadius: 4,
    plugins: {
      legend: {
        display: false,
        position: "topleft",
      },
      title: {
        display: true,
        text: "Audio Features",
        position: "top",
        color: "#ffffff",
        font: {
          size: 16,
          family: "Plus Jakarta Sans",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at zero
        ticks: {
          color: "#ffffff",
          font: {
            family: "Plus Jakarta Sans",
          },
        },
      },
      x: {
        max: 1,
        ticks: {
          color: "#ffffff",
          font: {
            family: "Plus Jakarta Sans",
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
