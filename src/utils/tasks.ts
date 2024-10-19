interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

export const fetchTasks = () => {
  let tasks: TaskType[] = [];
  try {
    tasks = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks") as string)
      : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage", error);
    tasks = [];
  }

  return tasks;
};

export const saveTask = (task: TaskType) => {
  let tasks: TaskType[] = fetchTasks();

  tasks = [...tasks, task];

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const editTask = (task: TaskType) => {
  let tasks: TaskType[] = fetchTasks();

  tasks = tasks.map((item) => {
    if (item.id === task.id) {
      return task;
    } else {
      return item;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const deleteTask = (id: number) => {
  let tasks: TaskType[] = fetchTasks();

  tasks = tasks.filter((item) => item.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const searchTaskById = (id: number) => {
  const tasks: TaskType[] = fetchTasks();

  if (tasks.length === 0) {
    return null;
  }

  const task: TaskType = tasks.filter((item) => item.id === id)[0];

  return task;
};

export const searchTask = (keyword: string) => {
  const tasks: TaskType[] = fetchTasks();

  if (tasks.length === 0) {
    return null;
  }

  const tasksFound: TaskType[] = tasks.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
  );

  return tasksFound;
};

export const sortedTasks = () => {
  const tasks: TaskType[] = fetchTasks();

  if (tasks.length === 0) {
    return [];
  }

  const prioritySeq = {
    high: 1,
    medium: 2,
    low: 3,
  };

  tasks.sort(
    (a, b) =>
      prioritySeq[a.priority as keyof typeof prioritySeq] -
      prioritySeq[b.priority as keyof typeof prioritySeq]
  );

  return tasks;
};
