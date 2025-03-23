const CheckboxQuestion = ({ question, value = [], onChange, required }) => {
  const questionId = question._id || question.id;

  const handleCheckboxChange = (e) => {
    const option = e.target.value;
    const isChecked = e.target.checked;

    const currentValue = Array.isArray(value) ? value : [];

    const customEvent = {
      target: {
        name: questionId,
        value: isChecked
          ? [...currentValue, option]
          : currentValue.filter((item) => item !== option),
      },
    };

    onChange(customEvent);
  };

  const safeValue = Array.isArray(value) ? value : [];

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
                type="checkbox"
                name={`${questionId}_${index}`}
                value={option}
                checked={safeValue.includes(option)}
                onChange={handleCheckboxChange}
                className="checkbox-primary checkbox mr-2"
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
