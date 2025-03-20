import FormInput from "./inputs/FormInput";
import FormSelect from "./inputs/FormSelect";
import FormTextArea from "./inputs/FormTextArea";

const NewJobForm = ({ 
  formData, 
  handleSubmit, 
  handleChange,
  goToNextStep, 
  onCancel}) => {
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
  const jobTypes = ["Full-time", "Part-time", "Internship"];

  return (
    <form
      type="submit"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <FormInput
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      {/* <FormInput
        label="Application URL"
        name="applicationUrl"
        value={formData.applicationUrl}
        onChange={handleChange}
      /> */}

      <FormSelect
        label="Type"
        name="employmentType"
        options={jobTypes}
        value={formData.employmentType}
        onChange={handleChange}
      />

      <FormSelect
        label="Experience Level"
        name="seniority"
        options={experienceLevels}
        value={formData.seniority}
        onChange={handleChange}
      />

      <FormInput
        label="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
      />

      <FormTextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <FormTextArea
        label="Job Functions"
        name="tasks"
        value={formData.tasks}
        onChange={handleChange}
      />

      <FormTextArea
        label="Requirements"
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
      />

      <div className="col-span-full flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="btn"
        > Cancel
        </button>
        <button
          onClick={() => goToNextStep()}
          className="btn btn-primary"
        > Next
        </button>
      </div>
    </form>
  );
};

export default NewJobForm;
