import OptionForm from "./OptionForm"
import FormInput from "./form/inputs/FormInput"
import FormRadio from "./form/inputs/FormRadio"
import FormSelect from "./form/inputs/FormSelect"

const QuestionForm = ({ 
  currentQuestion, 
  setCurrentQuestion, 
  currentOption, 
  setCurrentOption, 
  handleChange, 
  handleAddQuestion, 
  editMode, 
  editIndex, 
  handleCancelEdit
 }) => {
  
  const handleAddOption = (e) => {
    e.preventDefault();
    if (currentOption.trim() !== "") {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, currentOption.trim()]
      });
      setCurrentOption("");
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions.splice(index, 1);
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions
    });
  };

  const shouldShowOptions = currentQuestion.questionType === "multipleChoice" 
    || currentQuestion.questionType === "boolean";

  return (
    <div>
      <div>
        <form className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2">
            {editMode ? `Edit Question ${editIndex + 1}` : "Create New Question"}
          </h3>
          
          <FormSelect 
            label="Select question type"
            name="questionType"
            onChange={handleChange}
            options={["text", "boolean", "multipleChoice"]} 
            value={currentQuestion.questionType}
          />

          <FormInput
            label="Insert question text"
            name="questionText"
            onChange={handleChange}
            value={currentQuestion.questionText}
          />

          <OptionForm
            shouldShowOptions={shouldShowOptions}
            currentQuestion={currentQuestion}
            setCurrentOption={setCurrentOption}
            currentOption={currentOption}
            handleAddOption={handleAddOption}
            handleRemoveOption={handleRemoveOption}
          />

          <div className="flex items-center gap-4 mt-4">
            <label className="font-medium">Required:</label>
            <div className="flex gap-4">
              <FormRadio 
                name="required"
                value="true"
                label="Yes"
                handleChange={handleChange}
                checked={currentQuestion.required === true}
              />
              <FormRadio 
                name="required"
                value="false"
                label="No"
                handleChange={handleChange}
                checked={currentQuestion.required === false}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {editMode && (
                <button 
                  onClick={handleCancelEdit}
                  className="btn mt-4"
                  type="button"
                >
                  Cancel Edit
                </button>
              )}

            <button 
              onClick={handleAddQuestion}
              className="btn btn-primary mt-4"
              type="button"
            >
              {editMode ? "Update Question" : "Add Question"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default QuestionForm
