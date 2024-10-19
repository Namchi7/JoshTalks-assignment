import React, { useState } from "react";
import styles from "@/styles/createTask.module.css";
import { saveTask } from "@/utils/tasks";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const CreateTask: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");
  const [status, setStatus] = useState<boolean>(false);

  const clearFieldStates = () => {
    setTitle("");
    setDesc("");
    setPriority("");
    setStatus(false);
  };

  const handleSubmit = () => {
    const task: TaskType = {
      id: Date.now(),
      title: title,
      description: desc,
      priority: priority,
      completed: status,
    };

    saveTask(task);
    setOpen(false);
    clearFieldStates();
  };

  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className={styles.container}
    >
      <div className={styles.formDiv}>
        <h3 className={styles.heading}>Create A Task</h3>
        <form className={styles.form}>
          <div className={styles.fieldGrp}>
            <label htmlFor="title" className={styles.label}>
              Title:
            </label>
            <input
              type="text"
              placeholder="Enter title here..."
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className={styles.textInput}
            />
          </div>

          <div className={styles.fieldGrp}>
            <label htmlFor="description" className={styles.label}>
              Description:
            </label>
            <textarea
              rows={4}
              placeholder="Enter description here..."
              name="description"
              onChange={(e) => setDesc(e.target.value)}
              className={styles.textInput}
            ></textarea>
          </div>

          <fieldset
            onChange={(e) => setPriority(e.target.value)}
            className={styles.fieldset}
          >
            <legend className={styles.legend}>Priority:</legend>
            <div className={styles.radioOptions}>
              <div className={styles.radioGrp}>
                <input
                  type="radio"
                  id="priority1"
                  name="priority"
                  value="low"
                  className={styles.radioInput}
                />
                <label htmlFor="priority1" className={styles.radioLabel}>
                  Low
                </label>
              </div>

              <div className={styles.radioGrp}>
                <input
                  type="radio"
                  id="priority2"
                  name="priority"
                  value="medium"
                  className={styles.radioInput}
                />
                <label htmlFor="priority2" className={styles.radioLabel}>
                  Medium
                </label>
              </div>

              <div className={styles.radioGrp}>
                <input
                  type="radio"
                  id="priority3"
                  name="priority"
                  value="high"
                  className={styles.radioInput}
                />
                <label htmlFor="priority3" className={styles.radioLabel}>
                  High
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset
            onChange={(e) => setStatus(e.target.value === "0" ? false : true)}
            className={styles.fieldset}
          >
            <legend className={styles.legend}>Status:</legend>
            <div className={styles.radioOptions}>
              <div className={styles.radioGrp}>
                <input
                  type="radio"
                  id="status1"
                  name="status"
                  value={0}
                  className={styles.radioInput}
                />
                <label htmlFor="status1" className={styles.radioLabel}>
                  To Do
                </label>
              </div>

              <div className={styles.radioGrp}>
                <input
                  type="radio"
                  id="status2"
                  name="status"
                  value={1}
                  className={styles.radioInput}
                />
                <label htmlFor="status2" className={styles.radioLabel}>
                  Completed
                </label>
              </div>
            </div>
          </fieldset>

          <div className={styles.buttons}>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`${styles.button} ${styles.submitBtn}`}
            >
              Create task
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              className={`${styles.button} ${styles.cancelBtn}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
