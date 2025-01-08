const NewJob = () => {
  return (
    <form>
      Title<input type="text" />
      Company Name<input type="text" />
      Location<input type="text" />
      Application URL <input type="text" />
      Type 
        <select>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
        </select>
      Experience Level 
        <select>
          <option>Entry Level</option>
          <option>Mid Level</option>
          <option>Senior Level</option>
        </select>
      Salary <input type="text" />
      Resume <textarea />
      Full Description <textarea />
      <button type="submit">Save</button>
      <button>Show preview</button>
    </form>
  )
}

export default NewJob