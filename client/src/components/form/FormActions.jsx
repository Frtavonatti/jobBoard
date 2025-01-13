import { useState } from "react"
import Card from "../job/Card";

const FormActions = ({ addJob, formData }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className="col-span-1 mt-4 flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
        <button className="btn" type="button" onClick={() => { setIsVisible(!isVisible) }}>
          {isVisible ? 'Hide' : 'Show Preview'}
        </button>
        <button
          onClick={addJob}
          className="btn dark:bg-slate-100 dark:text-slate-800"
          type="submit"
        >
          Save
        </button>
      </div>
      {isVisible && <Card job={formData} />}
    </>
  );
}

export default FormActions