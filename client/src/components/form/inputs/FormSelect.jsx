const FormSelect = ({ label, options, ...props }) => {
  return (
    <label className="block">
      {label}
      <select className="select select-bordered mt-1 w-full" {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;
