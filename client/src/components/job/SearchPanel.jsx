import FormInput from "../form/inputs/FormInput"
import FormSelect from "../form/inputs/FormSelect"

const SearchPanel = ({ handleSearch, searchTerm, handleReset }) => {
  return (
    <form className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 my-8">
      <div className="w-full sm:w-full md:w-[48%] lg:w-[32%]">
        <FormInput
          name="title"
          value={searchTerm.title}
          placeholder="Search jobs..."
          label="Search"
          onChange={handleSearch}
        />
      </div>

      <div className="w-full sm:w-full md:w-[48%] lg:w-[32%]">
        <FormInput
          name="location"
          value={searchTerm.location}
          label="Location"
          placeholder="Location"
          onChange={handleSearch}
        />
      </div>

      <div className="w-full sm:w-full md:w-[48%] lg:w-[32%]">
        <FormInput
          type="number"
          name="minSalary"
          value={searchTerm.minSalary}
          label="Min Salary"
          placeholder="Min Salary"
          onChange={handleSearch}
        />
      </div>

      <div className="w-full sm:w-full md:w-[48%] lg:w-[32%]">
        <FormSelect
          name="seniority"
          value={searchTerm.seniority}
          label="Seniority"
          options={["Any", "Intern", "Junior", "Mid", "Senior", "Lead"]}
          onChange={handleSearch}
        />
      </div>

      <div className="w-full sm:w-full md:w-[48%] lg:w-[32%]">
        <FormSelect
          name="type"
          value={searchTerm.type}
          label="Type"
          options={["Any", "Full-time", "Part-time", "Contract", "Freelance", "Internship"]}
          onChange={handleSearch}
        />
      </div>

      <div className="w-full sm:w-full md:w-[48%] lg:w-[32%] flex flex-row justify-between gap-2">
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center ml-2">
            <input type="checkbox" name="remote" id="remote" />
            <label className="ml-2 font-semibold text-sm" htmlFor="remote">Remote**</label>
          </div>
          <div className="flex items-center ml-2">
            <input type="checkbox" name="favorites" id="favorites" />
            <label className="ml-2 font-semibold text-sm" htmlFor="favorites">Favorites**</label>
          </div>
        </div>
        <button 
          className="btn mt-6"
          onChange={handleReset}
        >Reset</button>
      </div>
    </form>
  )
}

export default SearchPanel
