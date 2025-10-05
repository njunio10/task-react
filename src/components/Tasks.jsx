import {
  ChevronRightIcon,
  TrashIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "pending") return !task.isCompleted;
    return true;
  });

  const completedCount = tasks.filter((task) => task.isCompleted).length;
  const totalCount = tasks.length;

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("completed", task.isCompleted);
    navigate(`/task?${query.toString()}`);
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClockIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Nenhuma tarefa ainda
        </h3>
        <p className="text-gray-600">
          Adicione sua primeira tarefa para começar a organizar seu dia!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header com estatísticas e filtros */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Suas Tarefas</h2>
          <div className="text-sm text-gray-600">
            {completedCount} de {totalCount} concluídas
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                totalCount > 0 ? (completedCount / totalCount) * 100 : 0
              }%`,
            }}
          ></div>
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          {[
            { key: "all", label: "Todas" },
            { key: "pending", label: "Pendentes" },
            { key: "completed", label: "Concluídas" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filter === key
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="divide-y divide-gray-100">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {filter === "completed" && "Nenhuma tarefa concluída ainda"}
            {filter === "pending" && "Todas as tarefas estão concluídas! 🎉"}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onTaskClick(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-indigo-500"
                  }`}
                >
                  {task.isCompleted && <CheckIcon className="w-4 h-4" />}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-medium ${
                      task.isCompleted
                        ? "text-gray-500 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p
                      className={`text-sm mt-1 ${
                        task.isCompleted ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {task.description.length > 50
                        ? `${task.description.substring(0, 50)}...`
                        : task.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSeeDetailsClick(task)}
                    className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
                    title="Ver detalhes"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTaskClick(task.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Excluir tarefa"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
