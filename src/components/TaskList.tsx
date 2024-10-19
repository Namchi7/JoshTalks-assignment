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

const TaskList: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  return (
    <div className={styles.container}>
      {tasks?.map((item, i) => (
        <Task key={i} />
      ))}
    </div>
  );
};

export default TaskList;
