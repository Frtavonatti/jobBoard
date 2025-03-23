const TextQuestion = ({ question, value, onChange, required }) => {
  const questionId = question._id || question.id;

  return (
    <div className="mb-4">
      <label className="block font-sans text-sm font-semibold">
        {question.questionText}
        {required && <span className="ml-1 text-red-500">*</span>}
        <textarea
          name={questionId}
          value={value || ""}
          onChange={onChange}
          required={required}
          className="input input-bordered mt-1 h-24 w-full p-2"
        />
      </label>
    </div>
  );
};

export default TextQuestion;
