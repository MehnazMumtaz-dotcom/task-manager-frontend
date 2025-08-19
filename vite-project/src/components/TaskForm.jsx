import React, { useState, useEffect } from "react";

function TaskForm({ addTask, updateTask, editingTask }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTask) {
      updateTask(editingTask.id, text);
    } else {
      addTask(text);
    }
    setText("");
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
