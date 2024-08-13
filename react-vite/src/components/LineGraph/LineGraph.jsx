import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./LineGraph.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

function generateStockPrices(numPrices, minPrice, maxPrice) {
  const prices = [];
  for (let i = 0; i < numPrices; i++) {
    // Generate a random price within the specified range
    // Multiplier of 1000 for precision, then divide to get two decimal places
    const price =
      Math.floor(Math.random() * (maxPrice - minPrice) * 100 + minPrice * 100) /
      100;
    prices.push(price);
  }
  return prices;
}

function LineGraph({ stock }) {
  const lineChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        data: generateStockPrices(
          200,
          stock.fifty_two_week_high,
          stock.fifty_two_week_low
        ),
        borderColor: "#00c805",
        type: "line",
        backgroundColor: "black",
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgba(0, 0, 0, 0)",
        pointHoverBackgroundColor: "#5AC53B",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="stock-graph">
      <Line data={lineChartData} options={options} />
    </div>
  );
}

export default LineGraph;
