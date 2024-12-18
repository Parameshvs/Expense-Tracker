import React from "react";
import { Entry } from "../App";

interface SummaryProps {
  entries: Entry[];
}

const Summary: React.FC<SummaryProps> = ({ entries }) => {
  const totalIncome = entries.filter(entry => entry.type === "income").reduce((acc, entry) => acc + entry.amount, 0);
  const totalExpenses = entries.filter(entry => entry.type === "expense").reduce((acc, entry) => acc + entry.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <h3>Summary</h3>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Balance: ${balance}</p>
    </div>
  );
};

export default Summary;
