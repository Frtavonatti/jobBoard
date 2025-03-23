import axios from "axios";

const baseUrl = "http://localhost:3001/api/applications";

const applyToJob = async (jobId, application, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/${jobId}/apply`,
      application,
      config,
    );
    return response.data;
  } catch (error) {
    console.error("Error applying to job:", error);
  }
};

export default { applyToJob };
