import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ArrowLeft, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AppService from "../../services/applications";
import FormSelect from "../../components/form/inputs/FormSelect";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import getTimeDiff from "../../lib/utils";
import { statusColor } from "../../lib/constants";

const ApplicationPreview = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await AppService.getApplication(id, user.token);
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };
    fetchApplication();
  }, [id, user.token]);

  const handleStatusChange = (e) => {
    setApplication({ ...application, status: e.target.value });
  };

  const handleSaveUpdatedStatus = async (newStatus) => {
    try {
      const updatedApplication = await AppService.updateApplicationStatus(
        application._id,
        { status: newStatus || application.status },
        user.token,
      );
      setApplication(updatedApplication);
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  if (!application) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8">
      <div className="mb-6 flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Application Details</h2>
        <span className={`rounded p-2 text-xs font-bold ${statusColor(application.status)}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      <div className="mb-6 overflow-hidden rounded-lg border shadow-md">
        <div className="flex flex-col border-b border-gray-200 p-6 dark:border-gray-700 md:flex-row md:justify-between">
          <div className="ml-4 md:flex md:items-center">
            <div>
              <h3 className="text-xl font-bold">
                {application.data.firstName} {application.data.lastName}
              </h3>
              <span className="text-sm">
                Applied {getTimeDiff(application.date)}
              </span>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2 md:mr-8">
            <div className="flex items-center">
              <Mail className="mr-2" />
              <p>{application.data.email}</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <p>{application.data.phone}</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <p>{application.data.locations}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="mb-4 text-lg font-bold text-gray-700 dark:text-gray-300">
            Candidate Responses
          </h4>
          <div className="space-y-6">
            {application.answers.map((answer) => (
              <div
                key={answer.question_id}
                className="border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold">{answer.questionText}</h3>
                <h5 className="text-md mb-2 font-medium">{answer.question}</h5>
                <p>{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border p-6 shadow-md">
        <div className="flex gap-4">
          <div className="flex-grow">
            <FormSelect
              label="Change status"
              name="status"
              value={application.status}
              onChange={(e) => handleStatusChange(e)}
              options={[
                "applied",
                "discarded",
                "screening",
                "interview",
                "offer",
                "hired",
              ]}
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSaveUpdatedStatus}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <span className="flex items-center">
            <ArrowLeft className="mr-2" />
            Volver
          </span>
        </button>

        <button
          onClick={() => handleSaveUpdatedStatus("discarded")}
          className="btn bg-red-600 text-white hover:bg-red-700"
        >
          <span className="flex items-center">
            <X className="mr-2" />
            Reject
          </span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationPreview;
