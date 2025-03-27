import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ArrowLeft, X } from "lucide-react";
import AppService from "../../services/applications";
import getTimeDiff from "../../utils/getTimeDiff";
import FormSelect from "../../components/form/inputs/FormSelect";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ApplicationPreview = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await AppService.getApplication(id);
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };
    fetchApplication();
  }, [id]);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    // setApplication({ ...application, status: e.target.value });
  };

  if (!application) return <LoadingSpinner />;
  console.log('application:', application);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Application Details
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold p-2 rounded dark:bg-blue-900 dark:text-blue-300">
          {application.status.toUpperCase()}
        </span>
      </div>
      
      <div className="border shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:justify-between">
          <div className="md:flex md:items-center ml-4">
            <div>
              <h3 className="text-xl font-bold">
                {application.data.firstName} {application.data.lastName}
              </h3>
              <span className="text-sm">
                Applied {getTimeDiff(application.date)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2 md:mr-8">
            <div className="flex items-center">
              <Mail className="mr-2" />
              <p>{application.data.email}</p>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <p>{application.data.phone}</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2"/>
              <p>{application.data.locations}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Respuestas del candidato
          </h4>
          <div className="space-y-6">
            {application.answers.map((answer) => (
              <div key={answer.question_id} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <h5 className="text-md font-medium mb-2">{answer.question}</h5>
                <p>{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border shadow-md rounded-lg p-6 mb-6">
        <div className="flex gap-4">
          <div className="flex-grow">
            <FormSelect
              label="Change status"
              name="status"
              value={application.status}
              onChange={(e) => console.log(e.target.value)}
              options={["applied", "discarded", "screening", "interview", "offer", "hired"]}
            />
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={() => console.log("Save")} 
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
          className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          <span className="flex items-center">
            <ArrowLeft className="mr-2"/>
            Volver
          </span>
        </button>
        
        <button 
          onClick={() => console.log("Rechazar candidato")}
          className="btn bg-red-600 hover:bg-red-700 text-white"
        >
          <span className="flex items-center">
            <X className="mr-2"/>
            Reject
          </span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationPreview;