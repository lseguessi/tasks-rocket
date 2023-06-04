"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import TaskCard from "@/components/TaskCard";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [inputTask, setInputTask] = useState<string>("");
  const [listTasks, setListTasks] = useState<any>([]);
  const [taskCompleted, setTaskCompleted] = useState<number>(0);

  function handleNewTextInput(e: any) {
    setInputTask(e.target.value);
    event?.target?.setCustomValidity("");
  }

  function handleAddTask() {
    event?.preventDefault();

    const task = {
      id: uuidv4(),
      title: inputTask,
      done: false,
    };

    setListTasks([...listTasks, task]);
    setInputTask("");
  }

  function handleNewTaskInvalid() {
    event?.target?.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(taskToDelete: any) {
    const newListTasks: any = listTasks.filter((task: any) => {
      return task.id !== taskToDelete.id;
    });
    if(taskToDelete.done == true) {
      setTaskCompleted((oldValue) => oldValue - 1)
    }
    setListTasks(newListTasks);
  }

  function changeTaskConclusion(task: any) {
    task.done = !task.done;
    setTaskCompleted(listTasks.filter((task: any) => task.done == true).length);
  }

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <img src="/Logo.png" alt="Logo todo com um foguete do lado direito" />
      </header>
      <form className={styles.input} onSubmit={handleAddTask}>
        <div className={styles.formInput}>
          <input
            type="text"
            name="task"
            id="task"
            placeholder="Adicione uma nova tarefa"
            value={inputTask}
            onChange={(e: any) => handleNewTextInput(e)}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button className={styles.btnCriar}>
            Criar
            <IoIosAddCircleOutline color="white" />
          </button>
        </div>
      </form>

      {/* LIST OF TASKS */}
      <div className={styles.createdTasks}>
        <div className={styles.countTasks}>
          <span className={styles.taskCreateTitle}>Tarefas criadas</span>
          <div className={styles.counter}>{listTasks.length}</div>
        </div>

        <div className={styles.completedTasks}>
          <span className={styles.taskCompletedTitle}>Concluídas</span>
          <div className={taskCompleted > 0 ? styles.counting : styles.counter}>
            {taskCompleted > 0 ? (
              <>
                {taskCompleted} de {listTasks.length}
              </>
            ) : (
              <>{listTasks.length}</>
            )}
          </div>
        </div>
      </div>
      <div className={styles.tasksContainer}>
        {listTasks.length > 0 ? (
          <>
            {listTasks.map((task: any) => (
              <div className={styles.taskCardContainer} key={task.id}>
                <TaskCard
                  task={task}
                  deleteTask={deleteTask}
                  changeTaskConclusion={changeTaskConclusion}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.borderTasks}>
              <div className={styles.emptyList}>
                <img src="/empty.png" alt="" />
                <p className={styles.subParagraph}>
                  Você ainda não tem tarefas cadastradas
                </p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
