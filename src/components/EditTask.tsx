import React, { useEffect, useState } from "react";
import styles from "@/styles/createTask.module.css";
import { editTask, searchTask, searchTaskById } from "@/utils/tasks";

interface TaskType {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
}

const EditTask: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editId: number | null;
}> = ({ open, setOpen, editId }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");
  const [status, setStatus] = useState<boolean>(false);
  const [oldTask, setOldTask] = useState<TaskType>();

  const clearFieldStates = () => {
    setTitle("");
    setDesc("");
    setPriority("");
    setStatus(false);
  };

  const handleSubmit = () => {
    const task: TaskType = {
      id: editId,
      title: title,
      description: desc,
      priority: priority,
      completed: status,
    };

    editTask(task);
    setOpen(false);
    clearFieldStates();
  };

  useEffect(() => {
    if (editId) {
      const task: TaskType | null = searchTaskById(editId);

      if (task) {
        setTitle(task.title);
        setDesc(task.description);
        setPriority(task.priority);
        setStatus(task.completed);

        setOldTask(task);
      }
    }
  }, [editId]);

  return (
    <>
      {oldTask && (
        <div
          style={{ display: open ? "flex" : "none" }}
          className={styles.container}
        >
          <div className={styles.formDiv}>
            <h3 className={styles.heading}>Edit Task</h3>
            <form className={styles.form}>
              <div className={styles.fieldGrp}>
                <label htmlFor="title" className={styles.label}>
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="Enter title here..."
                  name="title"
                  value={title}
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
                  value={desc}
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
                      defaultChecked={priority === "low" ? true : false}
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
                      defaultChecked={priority === "medium" ? true : false}
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
                      defaultChecked={priority === "high" ? true : false}
                      className={styles.radioInput}
                    />
                    <label htmlFor="priority3" className={styles.radioLabel}>
                      High
                    </label>
                  </div>
                </div>
              </fieldset>

              <fieldset
                onChange={(e) =>
                  setStatus(e.target.value === "0" ? false : true)
                }
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
                      defaultChecked={status ? false : true}
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
                      defaultChecked={status ? true : false}
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
                  Save task
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
      )}
    </>
  );
};

export default EditTask;
