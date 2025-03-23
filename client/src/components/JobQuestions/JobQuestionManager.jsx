import { useState, useEffect } from "react"
import QuestionsPreview from "./QuestionsPreview"
import QuestionForm from "./QuestionForm"
import FormActions from "../form/inputs/FormActions"

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
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (formData && formData.questions && formData.questions.length > 0) {
      setQuestions(formData.questions);
    }
  }, [formData]);

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

  const handleEditQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleCancelEdit = () => {
    setCurrentQuestion(initialQuestionState);
    setEditMode(false);
    setEditIndex(null);
    setCurrentOption("");
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
    
    if (editMode) {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = currentQuestion;
      setQuestions(updatedQuestions);
      setEditMode(false);
      setEditIndex(null);
    } else {
      // Add new question
      setQuestions(questions.concat(currentQuestion));
    }

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

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)]">

      <QuestionsPreview
        questions={questions}
        editMode={editMode}
        handleEditQuestion={handleEditQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
      />

      <QuestionForm
        currentQuestion={currentQuestion}
        currentOption={currentOption}
        setCurrentQuestion={setCurrentQuestion}
        setCurrentOption={setCurrentOption}
        handleChange={handleChange}
        handleAddQuestion={handleAddQuestion}
        editMode={editMode}
        editIndex={editIndex}
        handleCancelEdit={handleCancelEdit}
      />

      <FormActions 
        onSubmit={handleFormSubmit} 
        onPrevious={goToPreviousStep}
        onCancel={onCancel}
        submitText={submitText}
        className="mt-24"
      />
    </div>
  )
}

export default JobQuestionManager