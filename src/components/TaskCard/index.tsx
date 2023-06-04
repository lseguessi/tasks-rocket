import React from "react";
import styles from "./TaskCard.module.css";
import { FiTrash2 } from "react-icons/fi";

interface TaskProps {
  task: {title: string, id: any};
  deleteTask: any;
  changeTaskConclusion: any;
}

export default function TaskCard({task, deleteTask, changeTaskConclusion}: TaskProps) {

  function handleDeleteTask() {
    deleteTask(task)
  }

  function handleChangeStatus(task: any) {
    changeTaskConclusion(task)
  }

  return (
    <div className={styles.container}>
      <label className={styles.labelChecbox}>
        <input type="checkbox" name="" id="" onChange={() => handleChangeStatus(task)}/>
        <span>
          {task.title}
        </span>
      </label>
      <div onClick={handleDeleteTask} className={styles.trashContainer}>
        <FiTrash2 className={styles.trash} />
      </div>
    </div>
  );
}
 