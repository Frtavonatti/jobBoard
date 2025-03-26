import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AppService from "../../services/applications";
import getTimeDiff from "../../utils/getTimeDiff";
import FormSelect from "../../components/form/inputs/FormSelect";

const ApplicationPreview = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setIsLoading(true);
        const data = await AppService.getApplication(id);
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    // Aquí implementarías la lógica para actualizar el estado
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!application) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      No se pudo cargar la solicitud. Por favor, intente nuevamente.
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Detalles de la solicitud
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {application.status.toUpperCase()}
        </span>
      </div>
      
      <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {application.data.firstName} {application.data.lastName}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Aplicación recibida {getTimeDiff(application.date)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Información de contacto
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300">{application.data.email}</p>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300">{application.data.phone}</p>
            </div>
            <div className="flex items-center md:col-span-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300">{application.data.locations}</p>
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
                <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">{answer.question}</h5>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Acciones
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
    label="Change status"
    name="status"
    value={application.status}
    onChange={(e) => console.log(e.target.value)}
    options={["applied", "discarded", "screening"]}
  />
          
          <div className="flex items-end">
            <button 
              onClick={() => console.log("Guardar cambios")} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors ml-2"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Volver
          </span>
        </button>
        
        <button 
          onClick={() => console.log("Rechazar candidato")}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Rechazar candidato
          </span>
        </button>
      </div>
    </div>
  );
};

export default ApplicationPreview;