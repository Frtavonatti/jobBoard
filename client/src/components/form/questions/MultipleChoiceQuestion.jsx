const MultipleChoiceQuestion = ({ question, value, onChange, required }) => {
  const questionId = question._id || question.id;
  
  return (
    <div className="mb-4">
      <p className="block font-sans text-sm font-semibold mb-2">
        {question.questionText}
        {required && <span className="text-red-500 ml-1">*</span>}
      </p>
      <div className="ml-2">
        {question.options.map((option, index) => (
          <div key={index} className="mb-1">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={questionId}
                value={option}
                checked={value === option}
                onChange={onChange}
                required={required}
                className="radio radio-primary mr-2"
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;