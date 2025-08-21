import React, { useState, useEffect } from "react";

function TaskForm({ fetchTasks, editingTask, setEditingTask }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
    }
  }, [editingTask]);

  // Task add/update backend par bhejna
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (editingTask) {
        // Update existing task
        await fetch(`http://127.0.0.1:8000/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        setEditingTask(null);
      } else {
        // Add new task
        await fetch("http://127.0.0.1:8000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      }

      setText("");
      fetchTasks(); // Backend se latest tasks dobara le aao
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">{editingTask ? "Update" : "Add"}</button>
    </form>
  );
}

export default TaskForm;

