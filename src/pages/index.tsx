import { Poppins } from "next/font/google";
import { GetServerSideProps } from "next";

import styles from "@/styles/home.module.css";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import { useEffect, useState } from "react";
import CreateTask from "@/components/CreateTask";
import EditTask from "@/components/EditTask";
import { fetchTasks, searchTask } from "@/utils/tasks";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks: TaskType[] = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      priority: "medium",
      completed: true,
    },
  ];

  console.log(tasks);

  return { props: { tasks: [] } };
};

const Home: React.FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const [allTasks, setAllTasks] = useState<TaskType[]>();

  useEffect(() => {
    if (keyword) {
      const tasks: TaskType[] = searchTask(keyword) || [];

      setAllTasks(tasks);
    } else {
      const tasks: TaskType[] = fetchTasks();

      setAllTasks(tasks);
    }
  }, [keyword]);

  useEffect(() => {
    if (!createOpen && !editOpen) {
      const localTasks: TaskType[] = fetchTasks();
      setAllTasks([...tasks, ...localTasks]);
    }
  }, [createOpen, editOpen]);

  return (
    <div className={`${styles.page} ${poppins.className}`}>
      <Header
        setCreateOpen={setCreateOpen}
        setKeyword={setKeyword}
        setAllTasks={setAllTasks}
      />

      <main className={styles.main}>
        {allTasks && (
          <TaskList
            tasks={allTasks}
            setEditOpen={setEditOpen}
            setEditId={setEditId}
            setAllTasks={setAllTasks}
          />
        )}
      </main>

      {createOpen && <CreateTask open={createOpen} setOpen={setCreateOpen} />}

      {editOpen && (
        <EditTask open={editOpen} setOpen={setEditOpen} editId={editId} />
      )}
    </div>
  );
};

export default Home;
