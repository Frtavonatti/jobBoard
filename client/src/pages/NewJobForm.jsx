const NewJobForm = () => {
  return (
    <>
      <h3 className="text-2xl font-bold mt-8">New Listing</h3>
      <form className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 shadow-md rounded-md">
        <label className="block">
          Title
          <input className="input input-bordered w-full mt-1" type="text" />
        </label>
        <label className="block">
          Company Name
          <input className="input input-bordered w-full mt-1" type="text" />
        </label>
        <label className="block">
          Location
          <input className="input input-bordered w-full mt-1" type="text" />
        </label>
        <label className="block">
          Application URL
          <input className="input input-bordered w-full mt-1" type="text" />
        </label>
        <label className="block">
          Type
          <select className="select select-bordered w-full mt-1">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
          </select>
        </label>
        <label className="block">
          Experience Level
          <select className="select select-bordered w-full mt-1">
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
        </label>
        <label className="block">
          Salary
          <input className="input input-bordered w-full mt-1" type="text" />
        </label>
        <label className="block col-span-1 sm:col-span-2 lg:col-span-3">
          Summary
          <textarea className="textarea textarea-bordered w-full mt-1" />
        </label>
        <label className="block col-span-1 sm:col-span-2 lg:col-span-3">
          Full Description
          <textarea className="textarea textarea-bordered w-full mt-1" />
        </label>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-4">
          <button className="btn" type="button">Show preview</button>
          <button className="btn dark:bg-slate-100 dark:text-slate-800" type="submit">Save</button>
        </div>
      </form>
    </>

  )
}

export default NewJobForm