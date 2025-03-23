const FormActions = ({
  submitText, 
  onSubmit, 
  onPrevious,
  cancelText = "Cancel",
  className = "", 
  onCancel }) => {
  return (
    <div className={`col-span-1 flex justify-between sm:col-span-2 lg:col-span-3 ${className}`}>
      <button 
        type="button"
        onClick={onCancel}
        className="btn bg-red-800 text-white"
      > {cancelText}
      </button>
    
      <div className="flex gap-2">
        <button
          onClick={() => onPrevious()}
          className="btn"
        > Previous
        </button>

        <button 
          type="button"
          onClick={onSubmit}
          className="btn btn-primary"
        > {submitText}
        </button>
      </div>
    </div>
  );
};

export default FormActions;
