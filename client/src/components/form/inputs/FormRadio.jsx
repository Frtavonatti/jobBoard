const FormRadio = ({ value, label, handleChange, ...props }) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        name="required"
        value={value}
        onChange={handleChange}
        className="mr-2"
        {...props}
      />
      {label}
    </label>
  );
};

export default FormRadio;
