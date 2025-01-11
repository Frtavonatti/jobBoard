import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import jobService from '../services/jobs'
import FormInput from '../components/form/FormInput';
import FormSelect from '../components/form/FormSelect';
import FormTextArea from '../components/form/FormTextArea';

const NewJobForm = () => {
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
  const jobTypes = ["Full-time", "Part-time", "Internship"];
  const initialState = {
    title: '',
    company: '',
    location: '',
    applicationUrl: '',
    employmentType: 'Full-time',
    seniority: 'Entry Level',
    salary: '',
    description: '',
    summary: '',
    requirements: '',
    tasks: '',
    datePosted: new Date().toISOString().split('T')[0]
  }

  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const addJob = async (event) => {
    event.preventDefault()

    try {
      await jobService.createJob(formData)
      navigate('/');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  }

  return (
    <div className="px-8">
      <h3 className="mt-8 text-2xl font-bold">New Listing</h3>
      <form type="submit" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FormInput 
          label="Title"
          name="title"
          value={formData.title} 
          onChange={handleChange} />

        <FormInput 
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange} />

        <FormInput 
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange} />

        <FormInput 
          label="Application URL"
          name="applicationUrl"
          value={formData.applicationUrl}
          onChange={handleChange} />

        <FormSelect 
          label="Type"
          name="employmentType"
          options={jobTypes}
          value={formData.employmentType}
          onChange={handleChange} />

        <FormSelect 
          label="Experience Level"
          name="seniority"
          options={experienceLevels}
          value={formData.seniority}
          onChange={handleChange} />

        <FormInput 
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange} />

        <FormTextArea 
          label="Summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange} />

        <FormTextArea 
          label="Full Description"
          name="description"
          value={formData.description}
          onChange={handleChange} />
        
        <div className="col-span-1 mt-4 flex justify-end gap-2 sm:col-span-2 lg:col-span-3">
          <button className="btn" type="button">Show preview</button>
          <button 
            onClick={addJob}
            className="btn dark:bg-slate-100 dark:text-slate-800" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewJobForm;
