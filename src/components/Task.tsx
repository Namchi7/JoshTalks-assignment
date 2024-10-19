import React from "react";
import styles from "@/styles/task.module.css";
import { deleteTask, fetchTasks } from "@/utils/tasks";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const Task: React.FC<{
  task: TaskType;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setAllTasks: React.Dispatch<React.SetStateAction<TaskType[] | undefined>>;
}> = ({ task, setEditId, setEditOpen, setAllTasks }) => {
  const bgColor: string =
    task.priority === "high"
      ? "red"
      : task.priority === "medium"
      ? "yellow"
      : "lime";

  const handleEdit = (id: number) => {
    setEditId(id);
    setEditOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteTask(id);
    const tasks = fetchTasks();
    setAllTasks(tasks);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>{task.title}</p>

        <div className={styles.taskBtnDiv}>
          <button
            onClick={() => handleEdit(task.id)}
            className={styles.editBtn}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(task.id)}
            className={styles.deleteBtn}
          >
            Delete
          </button>
        </div>
      </div>

      <div className={styles.description}>{task.description}</div>

      <div className={styles.footer}>
        <div className={styles.priorityDiv}>
          <p>Priority: </p>
          <div
            style={{
              backgroundColor: bgColor,
              color: bgColor === "red" ? "white" : "#5c5c5c",
            }}
            className={styles.priority}
          >
            {task.priority}
          </div>
        </div>

        {task.completed && <div className={styles.completed}>Completed</div>}
      </div>
    </div>
  );
};

export default Task;
