import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // ✅ Backend ka base URL (yahan apna FastAPI ka deployed/local URL daalo)
  const API_URL = "http://127.0.0.1:8000/tasks";

  // ✅ backend se tasks fetch karna
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Add task
  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Update task
  const updateTask = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✅ Edit start
  const startEditing = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="app-container">
      <h1 className="title">Task Manager</h1>

      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        editingTask={editingTask}
      />

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        startEditing={startEditing}
      />
    </div>
  );
}

export default App;





