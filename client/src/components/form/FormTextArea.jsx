const FormTextArea = ({ label, ...props }) => {
  return (
    <label className="col-span-1 block sm:col-span-2 lg:col-span-3">
      {label}
      <textarea className="textarea textarea-bordered mt-1 w-full" {...props} />
    </label>
  );
};

export default FormTextArea;
