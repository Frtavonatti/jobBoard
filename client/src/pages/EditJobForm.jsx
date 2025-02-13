import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";
import jobService from "../services/jobs";
import JobForm from "../components/form/JobForm";
import FormActions from "../components/form/FormActions";

const EditJobForm = ({ token }) => {
  const { id } = useParams();
  const [, dispatchNotification] = useNotificationContext();
  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await jobService.updateJob(id, formData, token);
      dispatchNotification({
        type: "SHOW_NOTIFICATION",
        payload: `Job "${formData.title}" updated successfully`,
      });
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
      <JobForm
        formData={formData}
        handleChange={handleChange}
      />
      <FormActions
        onSubmit={handleSubmit}
        formData={formData}
        submitText="Update Job"
        onCancel={() => navigate('/')}
      />
    </div>
  );
};

export default EditJobForm;