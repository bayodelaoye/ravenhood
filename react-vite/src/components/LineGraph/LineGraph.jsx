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
  const dateArray = [];
  let month = null;
  const today = new Date();

  for (let i = 0; i < 51; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    if (date.getMonth() + 1 === 1) {
      month = "JAN";
    } else if (date.getMonth() + 1 === 2) {
      month = "FEB";
    } else if (date.getMonth() + 1 === 3) {
      month = "MAR";
    } else if (date.getMonth() + 1 === 4) {
      month = "APR";
    } else if (date.getMonth() + 1 === 5) {
      month = "MAY";
    } else if (date.getMonth() + 1 === 6) {
      month = "JUN";
    } else if (date.getMonth() + 1 === 7) {
      month = "JUL";
    } else if (date.getMonth() + 1 === 8) {
      month = "AUG";
    } else if (date.getMonth() + 1 === 9) {
      month = "SEP";
    } else if (date.getMonth() + 1 === 10) {
      month = "OCT";
    } else if (date.getMonth() + 1 === 11) {
      month = "NOV";
    } else if (date.getMonth() + 1 === 12) {
      month = "DEC";
    }

    dateArray.push(month + " " + date.getDate());
  }
  const lineChartData = {
    labels: dateArray.reverse(),
    datasets: [
      {
        data: generateStockPrices(
          100,
          stock.fifty_two_week_high,
          stock.fifty_two_week_low
        ),
        borderColor: "#00c805",
        borderWidth: 2.5,
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
    maintainAspectRatio: false,
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
      <Line data={lineChartData} width={"5%"} options={options} />
    </div>
  );
}

export default LineGraph;
