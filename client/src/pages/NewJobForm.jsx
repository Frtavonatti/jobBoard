import FormInput from '../components/form/FormInput';
import FormSelect from '../components/form/FormSelect';
import FormTextArea from '../components/form/FormTextArea';

const NewJobForm = () => {
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
  const jobTypes = ["Full-time", "Part-time", "Internship"];

  return (
    <div className="px-8">
      <h3 className="mt-8 text-2xl font-bold">New Listing</h3>

    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <FormInput label="Title" />
      <FormInput label="Company Name" />
      <FormInput label="Location" />
      <FormInput label="Application URL" />
      <FormSelect label="Type" options={jobTypes} />
      <FormSelect label="Experience Level" options={experienceLevels} />
      <FormInput label="Salary" />
      <FormTextArea label="Summary" />
      <FormTextArea label="Full Description" />
      
      <div className="col-span-1 mt-4 flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
        <button className="btn" type="button">Show preview</button>
        <button className="btn dark:bg-slate-100 dark:text-slate-800" type="submit">
          Save
        </button>
      </div>
    </form>
    </div>
  );
};

export default NewJobForm;
