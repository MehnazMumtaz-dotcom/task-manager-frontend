import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Add task
  const addTask = async (title) => {
    await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    fetchTasks();
  };

  // ✅ Update task
  const updateTask = async (id, updatedTask) => {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📒 Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;













