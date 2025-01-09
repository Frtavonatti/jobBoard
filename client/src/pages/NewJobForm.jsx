const NewJobForm = () => {
  return (
    <div className="px-8">
      <h3 className="mt-8 text-2xl font-bold">New Listing</h3>
      <form className="grid grid-cols-1 gap-4 rounded-md p-4 shadow-md sm:grid-cols-2 lg:grid-cols-3">
        <label className="block">
          Title
          <input className="input input-bordered mt-1 w-full" type="text" />
        </label>
        <label className="block">
          Company Name
          <input className="input input-bordered mt-1 w-full" type="text" />
        </label>
        <label className="block">
          Location
          <input className="input input-bordered mt-1 w-full" type="text" />
        </label>
        <label className="block">
          Application URL
          <input className="input input-bordered mt-1 w-full" type="text" />
        </label>
        <label className="block">
          Type
          <select className="select select-bordered mt-1 w-full">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
        </label>
        <label className="block">
          Experience Level
          <select className="select select-bordered mt-1 w-full">
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
        </label>
        <label className="block">
          Salary
          <input className="input input-bordered mt-1 w-full" type="text" />
        </label>
        <label className="col-span-1 block sm:col-span-2 lg:col-span-3">
          Summary
          <textarea className="textarea textarea-bordered mt-1 w-full" />
        </label>
        <label className="col-span-1 block sm:col-span-2 lg:col-span-3">
          Full Description
          <textarea className="textarea textarea-bordered mt-1 w-full" />
        </label>
        <div className="col-span-1 mt-4 flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
          <button className="btn" type="button">
            Show preview
          </button>
          <button
            className="btn dark:bg-slate-100 dark:text-slate-800"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewJobForm;
