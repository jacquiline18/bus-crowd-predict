import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const routes = ["Route A", "Route B", "Route C"];

const crowdPrediction = {
  "Route A": [30, 60, 80, 50],
  "Route B": [20, 40, 70, 90],
  "Route C": [10, 30, 50, 60]
};

function App() {
  const [route, setRoute] = useState("Route A");

  const data = {
    labels: ["8 AM", "12 PM", "4 PM", "8 PM"],
    datasets: [
      {
        label: "Predicted Crowd Level (%)",
        data: crowdPrediction[route],
        backgroundColor: [
          "#FFD700", // yellow
          "#1E90FF", // blue
          "#32CD32", // green
          "#FF8C00"  // orange
        ],
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#333",
          font: { size: 14 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#333" },
        grid: { color: "#eee" }
      },
      y: {
        ticks: { color: "#333" },
        grid: { color: "#eee" }
      }
    }
  };
const getRecommendation = () => {
  const values = crowdPrediction[route];
  const min = Math.min(...values);
  const index = values.indexOf(min);
  const times = ["8 AM", "12 PM", "4 PM", "8 PM"];

  return `Least crowded time for ${route} is ${times[index]} (${min}%)`;
};
  return (
    <div className="App">

      <h1 className="title">🚍 Smart Bus Crowd Prediction</h1>

      <div className="card">

        <h3>Select Bus Route</h3>

        <select
          className="routeSelect"
          onChange={(e) => setRoute(e.target.value)}
        >
          {routes.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <div className="chartBox">
          <Bar data={data} options={options} />
        </div>
<div className="recommendation">
  💡 {getRecommendation()}
</div>
      </div>

    </div>
  );
}

export default App;
