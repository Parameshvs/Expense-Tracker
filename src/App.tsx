import React, { useState } from "react";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import Summary from "./components/Summary";
import ExpenseChart from "./components/ExpenseChart";
import './App.css';

export interface Entry {
  id: number;
  type: "income" | "expense";
  description: string;
  amount: number;
  date: Date;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  // Add entry
  const addEntry = (type: "income" | "expense", description: string, amount: number, date: Date) => {
    const newEntry: Entry = {
      id: Date.now(),
      type,
      description,
      amount,
      date,
    };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  // Delete entry
  const deleteEntry = (id: number) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  // Edit entry (update description or amount)
  const editEntry = (id: number, updatedEntry: { description?: string; amount?: number }) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id
          ? { ...entry, ...updatedEntry }  // Update only the fields that are passed in updatedEntry
          : entry
      )
    );
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>
      <EntryForm onAdd={addEntry} />
      <Summary entries={entries} />
      <ExpenseChart entries={entries} />
      <EntryList entries={entries} onDelete={deleteEntry} onEdit={editEntry} />
    </div>
  );
};

export default App;
