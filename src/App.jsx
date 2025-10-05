import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { SearchIcon, BarChart3Icon } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filtrar tarefas por busca
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estatísticas
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const totalTasks = tasks.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // SE QUISER VOCE PODE USAR O FETCH TASKS PARA BUSCAR AS TAREFAS DA API

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=6",
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const data = await response.json();
  //     setTasks(data);
  //   };
  //   fetchTasks();
  // }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Gerenciador de Tarefas
          </h1>
          <p className="text-gray-600">
            Organize suas tarefas de forma eficiente
          </p>
        </div>

        {/* Estatísticas */}
        {totalTasks > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3Icon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Estatísticas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {totalTasks}
                </div>
                <div className="text-sm text-gray-600">Total de Tarefas</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {completedTasks}
                </div>
                <div className="text-sm text-gray-600">Concluídas</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {completionRate}%
                </div>
                <div className="text-sm text-gray-600">Taxa de Conclusão</div>
              </div>
            </div>
          </div>
        )}

        {/* Busca */}
        {totalTasks > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar tarefas..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={searchTerm ? filteredTasks : tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
