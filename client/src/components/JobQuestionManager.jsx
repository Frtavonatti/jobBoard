import { useState } from "react"
import FormActions from "./form/inputs/FormActions"
import FormSelect from "./form/inputs/FormSelect"
import FormInput from "./form/inputs/FormInput"
import FormRadio from "./form/inputs/FormRadio"

const JobQuestionManager = ({ formData, onSubmit, submitText, goToPreviousStep, onCancel }) => {
  const initialQuestionState = {
    questionText: "",
    questionType: "text",
    required: true,
    options: []
  }
  const [questions, setQuestions] = useState([]);  
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionState);
  const [currentOption, setCurrentOption] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "questionType") {
      setCurrentQuestion({ 
        ...currentQuestion,
        [name]: value,
        options: value === "text" ? [] : currentQuestion.options
      });
    } else if (name === "required") {
      setCurrentQuestion({
        ...currentQuestion,
        [name]: value === "true"
      });
    } else {
      setCurrentQuestion({ 
        ...currentQuestion,
        [name]: value 
      });
    }
  };
  
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

  const handleAddQuestion = (e) => {
    e.preventDefault();
    
    if (!currentQuestion.questionText.trim()) {
      alert("Please enter question text");
      return;
    }
    
    if ((currentQuestion.questionType === "multipleChoice" || currentQuestion.questionType === "boolean") 
        && currentQuestion.options.length < 2) {
      alert("Please add at least 2 options for this question type");
      return;
    }
    
    setQuestions(questions.concat(currentQuestion));
    setCurrentQuestion(initialQuestionState);
    setCurrentOption("");
  }
  
  // Wrapper for handleSubmit that ensures formData includes the questions
  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    
    const updatedFormData = {
      ...formData,
      questions: questions
    };

    onSubmit(e, updatedFormData);
  };

  // Determine if we should show the options UI
  const shouldShowOptions = currentQuestion.questionType === "multipleChoice" || currentQuestion.questionType === "boolean";

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)]">
      <h2 className="m-8 text-2xl font-bold">Questions</h2>

      {/* QUESTIONS PREVISUALIZATION */}
      {questions.length > 0 && <div className="flex flex-col gap-4 p-8">
        {questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-4 p-1 border-white border rounded-md">
            <p>Question text: {question.questionText}</p>
            <p>Question type: {question.questionType}</p>
            <p>Required: {question.required.toString()}</p>
            
            {(question.questionType === "multipleChoice" || question.questionType === "boolean") && 
             question.options.length > 0 && (
              <div>
                <p>Options:</p>
                <ul className="list-disc pl-6">
                  {question.options.map((option, optIndex) => (
                    <li key={optIndex}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>} 

      <div>
        <form className="flex flex-col gap-4 p-8">
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

          <button 
            onClick={handleAddQuestion}
            className="btn mt-4"
            type="button"
          >Add Question
          </button>
        </form>
      </div>

      <FormActions 
        onSubmit={handleFormSubmit}
        onPrevious={goToPreviousStep}
        onCancel={onCancel}
        submitText={submitText}
        className="mt-8"
      />
    </div>
  )
}

export default JobQuestionManager