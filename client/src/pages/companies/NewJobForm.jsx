import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotificationContext } from "../../context/NotificationContext";
import jobService from "../../services/jobs";
import JobForm from "../../components/form/NewJobForm";
import JobQuestionManager from "../../components/JobQuestions/JobQuestionManager";

const NewJobForm = () => {
  const { user } = useAuth();
  const [, dispatchNotification] = useNotificationContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    applicationUrl: "",
    employmentType: "Full-time",
    seniority: "Entry Level",
    salary: "",
    description: "",
    requirements: "",
    tasks: "",
    datePosted: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);

  const handleSubmit = async (event, updatedFormData = null) => {
    event.preventDefault();

    if (!user.token) {
      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: "You must be logged in to create a job post",
      });
      return;
    }
    
    try {
      const dataToSubmit = updatedFormData || formData;

      await jobService.createJob(dataToSubmit, user.token);

      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: `Post "${formData.title}" created successfully`,
      });
      navigate("/myjobs");
    } catch (error) {
      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: `Error deleting post: ${error.message}`,
      });
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="mb-6 px-8">
      <h3 className="m-8 text-2xl font-bold">New Listing</h3>      
      { step === 1 ? (
        <JobForm 
          formData={formData} 
          handleChange={handleChange}
          goToNextStep={goToNextStep}
          onCancel={() => navigate("/")}
        />
        ) : (
        <JobQuestionManager 
          onSubmit={handleSubmit}
          submitText={"Create Job"}
          formData={formData}
          setFormdata={setFormData}
          goToPreviousStep={goToPreviousStep}
          onCancel={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default NewJobForm;
