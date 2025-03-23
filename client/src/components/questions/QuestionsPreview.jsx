import { Trash2, Pen, Check, ToggleLeft } from "lucide-react";

const QuestionsPreview = ({
  questions,
  editMode,
  handleEditQuestion,
  handleDeleteQuestion,
}) => {
  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case "text":
        return "📝";
      case "multipleChoice":
        return "🔘";
      case "boolean":
        return "✓✗";
      default:
        return "❓";
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Questions ({questions.length})
          </h3>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {editMode
              ? "Editing question..."
              : "Click on a question to edit it"}
          </span>
        </div>
      </div>

      {questions.length > 0 && (
        <div className="flex flex-col gap-4 p-8">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-md border p-4 dark:border-slate-400"
            >
              <div className="flex justify-between">
                <div>
                  <p className="mb-4 text-lg font-semibold">
                    <span className="mr-2">
                      {getQuestionTypeIcon(question.questionType)}
                    </span>
                    {question.questionText}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-700">
                      <span className="mr-1">Type:</span>
                      <span className="font-medium">
                        {question.questionType}
                      </span>
                    </div>

                    <div
                      className={`flex items-center rounded-full px-3 py-1 ${
                        question.required
                          ? "bg-blue-900/30 text-blue-700 dark:bg-blue-100"
                          : "bg-slate-700 text-slate-700 dark:bg-slate-100"
                      }`}
                    >
                      {question.required ? (
                        <Check size={14} className="mr-1" />
                      ) : (
                        <ToggleLeft size={14} className="mr-1" />
                      )}
                      <span className="font-medium">
                        {question.required ? "Required" : "Optional"}
                      </span>
                    </div>
                  </div>

                  {(question.questionType === "multipleChoice" ||
                    question.questionType === "boolean") &&
                    question.options.length > 0 && (
                      <div className="mt-4 flex w-full flex-col gap-2">
                        <p className="mb-2 text-left font-semibold">Options:</p>
                        <div className="flex flex-wrap gap-2">
                          {question.options.map((option, optIndex) => (
                            <span
                              key={optIndex}
                              className="rounded-md bg-slate-700 px-3 py-1 text-sm dark:bg-slate-300 dark:text-slate-700"
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleEditQuestion(index)}
                    className="mb-auto rounded-lg p-1 hover:bg-slate-300 dark:hover:bg-slate-600"
                    type="button"
                    disabled={editMode}
                  >
                    <Pen
                      size={20}
                      className="text-slate-200 dark:text-slate-500"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="mb-auto rounded-lg p-1 hover:bg-slate-300 dark:hover:bg-slate-600"
                    type="button"
                    disabled={editMode}
                  >
                    <Trash2 size={20} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default QuestionsPreview;
