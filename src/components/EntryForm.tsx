import React, { useState } from "react";

interface EntryFormProps {
  onAdd: (type: "income" | "expense", description: string, amount: number, date: Date) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert("Please fill in all fields.");
      return;
    }
    onAdd(type, description, parseFloat(amount), new Date(date));
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default EntryForm;
