import React from "react";
import styles from "@/styles/taskList.module.css";
import Task from "@/components/Task";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const TaskList: React.FC<{
  tasks: TaskType[];
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  setAllTasks: React.Dispatch<React.SetStateAction<TaskType[] | undefined>>;
}> = ({ tasks, setEditId, setEditOpen, setAllTasks }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  return (
    <div className={styles.container}>
      {tasks?.map((task, i) => (
        <Task
          task={task}
          setEditId={setEditId}
          setEditOpen={setEditOpen}
          setAllTasks={setAllTasks}
          key={i}
        />
      ))}
    </div>
  );
};

export default TaskList;
