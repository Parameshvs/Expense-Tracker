import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Entry } from "../App";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ExpenseChartProps {
  entries: Entry[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ entries }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const incomeData = Array(12).fill(0); 
  const expenseData = Array(12).fill(0); 
  
  entries.forEach((entry) => {
    const month = entry.date.getMonth(); 
    if (entry.type === "income") {
      incomeData[month] += entry.amount;
    } else {
      expenseData[month] += entry.amount;
    }
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#4caf50", 
      },
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "#f44336", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, 
      },
      title: {
        display: true,
        text: "Monthly Income and Expense Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
  };

  return <Bar data={data} options={options as any} />;  
};

export default ExpenseChart;
