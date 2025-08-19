import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa"; // icons

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!task.trim()) return;
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="app-container">
      <h1 className="title"> Task Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
        />
        <button onClick={addTask} className="btn add-btn">
          {editIndex !== null ? <FaSave /> : <FaPlus />}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            <span>{t}</span>
            <div className="actions">
              <button onClick={() => editTask(index)} className="btn edit-btn">
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="btn delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



