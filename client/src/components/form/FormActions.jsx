const FormActions = ({ submitText, onSubmit, cancelText = "Cancel", onCancel }) => {
  return (
    <div className="col-span-1 mt-4 flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
      <button
        type="button"
        onClick={onCancel}
        className="btn"
      >
        {cancelText}
      </button>
      <button 
        type="submit"
        onClick={onSubmit}
        className="btn btn-primary"
      >
        {submitText}
      </button>
    </div>
  );
};

export default FormActions;

// import { useState } from "react";
// import Card from "../job/Card";

// const FormActions = ({ formData, onSubmit, ...props }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   return (
//     <>
//       {isVisible && <Card job={formData} />}

//       <div className="col-span-1 mt-4 flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
//         <button
//           className="btn"
//           type="button"
//           onClick={() => {
//             setIsVisible(!isVisible);
//           }}
//         >
//           {isVisible ? "Hide" : "Show Preview"}
//         </button>
//         <button onClick={onSubmit} className="btn btn-primary" type="submit">
//           Save
//         </button>
//       </div>
//     </>
//   );
// };
