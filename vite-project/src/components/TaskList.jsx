import React from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <span>{task.title}</span>
          <div className="task-actions">
            <button
              onClick={() =>
                updateTask(task.id, {
                  title: task.title,
                  completed: !task.completed,
                })
              }
              className="btn-complete"
            >
              <FaCheck />
            </button>
            <button
              onClick={() =>
                updateTask(task.id, { title: prompt("Edit task:", task.title), completed: task.completed })
              }
              className="btn-edit"
            >
              <FaEdit />
            </button>
            <button onClick={() => deleteTask(task.id)} className="btn-delete">
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;




