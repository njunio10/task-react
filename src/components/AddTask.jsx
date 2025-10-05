import { useState } from "react";
import { PlusIcon } from "lucide-react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      return alert("Por favor, preencha todos os campos");
    }
    onAddTaskSubmit(title, description);
    setTitle("");
    setDescription("");
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-600"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <PlusIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">Adicionar nova tarefa</span>
        </button>
      ) : (
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Nova Tarefa</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Título da tarefa"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              placeholder="Descrição da tarefa"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all transform hover:scale-105"
            >
              Adicionar Tarefa
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
