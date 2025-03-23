const FormInput = ({ label = "", className, type = "text", ...props }) => {
  return (
    <label className="block font-sans text-sm font-semibold">
      {label}
      <input
        type={type}
        className={`input input-bordered mt-1 w-full ${className}`}
        {...props}
      />
    </label>
  );
};

export default FormInput;
