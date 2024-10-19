import React from "react";
import styles from "@/styles/header.module.css";
import { sortedTasks } from "@/utils/tasks";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const Header: React.FC<{
  setAllTasks: React.Dispatch<React.SetStateAction<TaskType[] | undefined>>;
  setCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setAllTasks, setCreateOpen, setKeyword }) => {
  const sort = () => {
    const tasks: TaskType[] = sortedTasks();

    setAllTasks(tasks);
  };

  const createTask = () => {
    setCreateOpen((prev) => !prev);
  };

  const searchAction = (val: string) => {
    setKeyword(val.toLowerCase());
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.logo}>JoshTalks-TMA</div>

        <div className={styles.headerRight}>
          <div className={styles.searchDiv}>
            <input
              placeholder="Start typing to search..."
              onChange={(e) => searchAction(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div onClick={sort} className={styles.sortBtn}>
            Sort
          </div>

          <div onClick={createTask} className={styles.createBtn}>
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
