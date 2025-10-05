import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar React",
      description:
        "Estudar React para criar uma aplicação de gerenciador de tarefas",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar Node.js",
      description:
        "Estudar Node.js para criar uma aplicação de gerenciador de tarefas",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Estudar TypeScript",
      description:
        "Estudar TypeScript para criar uma aplicação de gerenciador de tarefas",
      isCompleted: false,
    },
  ]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = [
      ...tasks,
      {
        id: v4(),
        title: title,
        description: description,
        isCompleted: false,
      },
    ];
    setTasks(newTask);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 text-white font-bold text-center mb-4">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
