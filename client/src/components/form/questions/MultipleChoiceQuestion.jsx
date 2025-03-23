const MultipleChoiceQuestion = ({ question, value, onChange, required }) => {
  const questionId = question._id || question.id;

  return (
    <div className="mb-4">
      <p className="mb-2 block font-sans text-sm font-semibold">
        {question.questionText}
        {required && <span className="ml-1 text-red-500">*</span>}
      </p>
      <div className="ml-2">
        {question.options.map((option, index) => (
          <div key={index} className="mb-1">
            <label className="flex cursor-pointer items-center">
              <input
                type="radio"
                name={questionId}
                value={option}
                checked={value === option}
                onChange={onChange}
                required={required}
                className="radio-primary radio mr-2"
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
