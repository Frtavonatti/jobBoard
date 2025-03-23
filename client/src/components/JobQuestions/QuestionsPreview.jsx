import { Trash2, Pen } from "lucide-react"

const QuestionsPreview = ({ questions, editMode, handleEditQuestion, handleDeleteQuestion  }) => {
  return (
    <>
      {questions.length > 0 && <div className="flex flex-col gap-4 p-8">
        <h3 className="text-xl font-semibold mb-4">Created Questions</h3>
        {questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-4 p-4 border-white border rounded-md">
            <div className="flex justify-between">
              <div>
                <p><span className="font-semibold">Question {index + 1}:</span> {question.questionText}</p>
                <p><span className="font-semibold">Type:</span> {question.questionType}</p>
                <p><span className="font-semibold">Required:</span> {question.required.toString()}</p>
                
                {(question.questionType === "multipleChoice" || question.questionType === "boolean") && 
                question.options.length > 0 && (
                  <div>
                    <p className="font-semibold">Options:</p>
                    <ul className="list-disc pl-6">
                      {question.options.map((option, optIndex) => (
                        <li key={optIndex}>{option}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-2">
                <button 
                  onClick={() => handleEditQuestion(index)}
                  className="mb-auto rounded-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-slate-600"
                  type="button"
                  disabled={editMode}
                >
                  <Pen size={20} className="dark:text-slate-100" />
                </button>
                <button 
                  onClick={() => handleDeleteQuestion(index)}
                  className="mb-auto rounded-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-slate-600"
                  type="button"
                  disabled={editMode}
                >
                  <Trash2 size={20} className="dark:text-slate-100" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>} 
    </>
  )
}

export default QuestionsPreview