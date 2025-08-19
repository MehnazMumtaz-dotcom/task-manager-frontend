import React from "react";

function TaskList({ tasks, deleteTask, startEditing }) {
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
