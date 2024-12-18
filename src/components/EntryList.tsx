import React, { useState } from "react";
import { Entry } from "../App";

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedEntry: { description?: string; amount?: number }) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState<{ id: number | null; description: string; amount: number }>({ id: null, description: "", amount: 0 });

  const handleEdit = (id: number, description: string, amount: number) => {
    setEditMode({ id, description, amount });
  };

  const handleSave = () => {
    onEdit(editMode.id!, { description: editMode.description, amount: editMode.amount });
    setEditMode({ id: null, description: "", amount: 0 });
  };

  return (
    <div>
      <h2>Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {editMode.id === entry.id ? (
              <div>
                <input
                  type="text"
                  value={editMode.description}
                  onChange={(e) => setEditMode({ ...editMode, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editMode.amount}
                  onChange={(e) => setEditMode({ ...editMode, amount: parseFloat(e.target.value) })}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditMode({ id: null, description: "", amount: 0 })}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{entry.description} - ${entry.amount}</span>
                <span>{entry.type}</span>
                <span>{entry.date.toLocaleDateString()}</span>
                <button onClick={() => onDelete(entry.id)}>Delete</button>
                <button onClick={() => handleEdit(entry.id, entry.description, entry.amount)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
