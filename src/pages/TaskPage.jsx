import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, CheckCircleIcon, ClockIcon } from "lucide-react";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const completed = searchParams.get("completed") === "true";
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-4"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Detalhes da Tarefa
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  completed
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {completed ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : (
                  <ClockIcon className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2
                    className={`text-2xl font-bold ${
                      completed ? "text-gray-500 line-through" : "text-gray-800"
                    }`}
                  >
                    {title}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      completed
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {completed ? "Concluída" : "Pendente"}
                  </span>
                </div>
                <p
                  className={`text-lg ${
                    completed ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {description}
                </p>
              </div>
            </div>

            {description && description.length > 100 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Descrição Completa:
                </h3>
                <p
                  className={`text-gray-600 leading-relaxed ${
                    completed ? "line-through" : ""
                  }`}
                >
                  {description}
                </p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Status da tarefa</span>
                <span
                  className={`font-medium ${
                    completed ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {completed ? "✓ Concluída" : "⏳ Em andamento"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
