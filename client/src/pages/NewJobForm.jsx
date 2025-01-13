import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobService from "../services/jobs";
import { useNotificationContext } from "../context/NotificationContext";
import JobForm from "../components/JobForm";

const NewJobForm = () => {
  const [, dispatchNotification] = useNotificationContext();
  const navigate = useNavigate();

  const initialState = {
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
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addJob = async (event) => {
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

      <JobForm 
      formData={formData}
      onSubmit={addJob}
      handleChange={handleChange}
      />

    </div>
  );
};

export default NewJobForm;
