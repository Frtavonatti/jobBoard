import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";
import FormTextArea from "./form/FormTextArea";
import FormActions from "./form/FormActions";

const JobForm = ({ formData, handleChange, addJob }) => {
  const experienceLevels = ["Enthry Level", "Mid Level", "Senior Level"];
  const jobTypes = ["Full-time", "Part-time", "Internship"];

  return (
    <form type="submit"
    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" >

    <FormInput
      label="Title"
      name="title"
      value={formData.title}
      onChange={handleChange}
    />

    <FormInput
      label="Company Name"
      name="company"
      value={formData.company}
      onChange={handleChange}
    />

    <FormInput
      label="Location"
      name="location"
      value={formData.location}
      onChange={handleChange}
    />

    <FormInput
      label="Application URL"
      name="applicationUrl"
      value={formData.applicationUrl}
      onChange={handleChange}
    />

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
      label="Summary"
      name="summary"
      value={formData.summary}
      onChange={handleChange}
    />

    <FormTextArea
      label="Full Description"
      name="description"
      value={formData.description}
      onChange={handleChange}
    />

    <FormActions addJob={addJob} formData={formData} />
  </form>
  )
}

export default JobForm