const OptionForm = ({
  shouldShowOptions,
  currentQuestion,
  setCurrentOption,
  currentOption,
  handleAddOption,
  handleRemoveOption
}) => {
  return (
    <div>
      {shouldShowOptions && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md">
              <h3 className="mb-2 font-medium">
                {currentQuestion.questionType === "boolean" ? 
                  "Boolean Options (Single Selection)" : 
                  "Multiple Choice Options"
                }
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  {currentQuestion.questionType === "boolean" 
                    ? "Users will be able to select only ONE option" 
                    : "Users will be able to select MULTIPLE options"}
                </p>
                
                {currentQuestion.options.length > 0 && (
                  <ul className="mb-4">
                    {currentQuestion.options.map((option, index) => (
                      <li key={index} className="flex items-center gap-2 mb-1">
                        <span>{option}</span>
                        <button 
                          onClick={() => handleRemoveOption(index)}
                          className="text-red-500 text-xs"
                          type="button"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentOption}
                    onChange={(e) => setCurrentOption(e.target.value)}
                    placeholder="Enter option"
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button 
                    onClick={handleAddOption}
                    className="btn"
                    type="button"
                  >
                    Add Option
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}

export default OptionForm
