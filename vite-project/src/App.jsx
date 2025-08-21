import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa"; // icons

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://127.0.0.1:8000/tasks"; // 👈 apna backend ka URL

  // GET: sari tasks fetch krny k liye (page reload hone par bhi)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // POST ya PUT: naya task add krny ya edit krny k liye
  const addTask = () => {
    if (!task.trim()) return;

    if (editId !== null) {
      // agar edit mode on h to PUT request
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task }),
      })
        .then((res) => res.json())
        .then((updatedTask) => {
          setTasks(tasks.map((t) => (t.id === editId ? updatedTask : t)));
          setEditId(null);
          setTask("");
        });
    } else {
      // naya task add krny k liye POST request
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task }),
      })
        .then((res) => res.json())
        .then((newTask) => setTasks([...tasks, newTask]));
      setTask("");
    }
  };

  // DELETE: task delete krny k liye
  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((t) => t.id !== id)));
  };

  // EDIT: edit mode on
  const editTask = (t) => {
    setTask(t.title);
    setEditId(t.id);
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
          {editId !== null ? <FaSave /> : <FaPlus />}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className="task-item">
            <span>{t.title}</span>
            <div className="actions">
              <button onClick={() => editTask(t)} className="btn edit-btn">
                <FaEdit />
              </button>
              <button onClick={() => deleteTask(t.id)} className="btn delete-btn">
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




