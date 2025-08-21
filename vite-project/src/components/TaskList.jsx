import React from "react";

function TaskList({ tasks, fetchTasks, startEditing }) {
  // ✅ delete task backend se
  const deleteTask = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks(); // fresh list reload from backend
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <span>{task.text}</span>
          <div>
            <button className="edit" onClick={() => startEditing(task)}>
              Edit
            </button>
            <button className="delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;

