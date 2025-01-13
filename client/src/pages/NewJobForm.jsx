import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import jobService from "../services/jobs";
import JobForm from "../components/form/JobForm";
import FormActions from "../components/form/FormActions";

const NewJobForm = () => {
  const [, dispatchNotification] = useNotificationContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    applicationUrl: "",
    employmentType: "Full-time",
    seniority: "Entry Level",
    salary: "",
    description: "",
    summary: "",
    requirements: "",
    tasks: "",
    datePosted: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await jobService.createJob(formData);
      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: `Post "${formData.title}" created successfully`,
      });
      navigate("/");
    } catch (error) {
      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: `Error deleting post: ${error.message}`,
      });
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="px-8 mb-6">
      <h3 className="m-8 text-2xl font-bold">New Listing</h3>
      <JobForm formData={formData} handleChange={handleChange} />
      <FormActions formData={formData} onSubmit={handleSubmit} />
    </div>
  );
};

export default NewJobForm;
