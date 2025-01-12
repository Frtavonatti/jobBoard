const FormInput = ({ label, type = "text", ...props }) => {
  return (
    <label className="block">
      {label}
      <input
        type={type}
        className="input input-bordered mt-1 w-full"
        {...props}
      />
    </label>
  );
};

export default FormInput;
