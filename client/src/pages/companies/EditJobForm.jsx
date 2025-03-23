import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotificationContext } from "../../context/NotificationContext";
import jobService from "../../services/jobs";
import JobForm from "../../components/form/NewJobForm";
import JobQuestionManager from "../../components/JobQuestions/JobQuestionManager";

const EditJobForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [, dispatchNotification] = useNotificationContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const job = await jobService.getOneJob(id);
      setFormData(job);
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goToNextStep = () => setStep(step + 1);
  const goToPreviousStep = () => setStep(step - 1);

  const handleSubmit = async (event, updatedData = null) => {
    event.preventDefault();
    try {
      const dataToSubmit = updatedData || formData;
      const editedJob = await jobService.updateJob(id, dataToSubmit, user.token);
      if (editedJob) {
        dispatchNotification({
          type: "SHOW_NOTIFICATION",
          payload: `Job "${formData.title}" updated successfully`,
        });
      }
      navigate(`/jobs/${id}`);
    } catch (error) {
      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: `Error updating job: ${error.message}`,
      });
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Edit Job</h1>
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
          submitText="Update Job"
          formData={formData}
          setFormdata={setFormData}
          goToPreviousStep={goToPreviousStep}
          onCancel={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default EditJobForm;