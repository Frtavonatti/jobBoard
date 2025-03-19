const TextQuestion = ({ question, value, onChange, required }) => {
  const questionId = question._id || question.id;
  
  return (
    <div className="mb-4">
      <label className="block font-sans text-sm font-semibold">
        {question.questionText}
        {required && <span className="text-red-500 ml-1">*</span>}
        <textarea
          name={questionId}
          value={value || ""}
          onChange={onChange}
          required={required}
          className="input input-bordered mt-1 w-full h-24 p-2"
        />
      </label>
    </div>
  );
};

export default TextQuestion;