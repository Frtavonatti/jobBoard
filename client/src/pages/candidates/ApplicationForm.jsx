import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import jobService from "../../services/jobs";
import appService from "../../services/applications";
import ApplyJobForm from "../../components/form/ApplyJobForm";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [job, setJob] = useState("");
  const [formData, setFormData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      const job = await jobService.getOneJob(id);
      setJob(job);
      setQuestions(job.questions);
    };
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (user && user.profile) {
      setFormData({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        email: user.email,
        // Add more fields here...
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const applicationData = {
        ...formData,
        answers,
      };

      console.log("applicationData:", applicationData); // Debugging
      const savedApplication = await appService.applyToJob(
        id,
        applicationData,
        user.token,
      );
      console.log("savedApplication:", savedApplication); // Debugging
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  return (
    <div className="mb-6 px-8">
      <h3 className="m-8 text-2xl font-bold">
        Apply to {job.title} at {job.company}
      </h3>
      <form onSubmit={handleSubmit}>
        <ApplyJobForm
          formData={formData}
          questions={questions}
          answers={answers}
          handleChange={handleChange}
          handleQuestionChange={handleQuestionChange}
        />

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="btn mr-2"
            onClick={() => navigate(`/jobs/${id}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
