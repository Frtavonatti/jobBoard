import axios from "axios";

const baseUrl = "http://localhost:3001/api/applications";

const getApplication = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching application:", error);
  }
};

const getCandidateApplications = async (userId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(`${baseUrl}/user/${userId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};

const getJobApplications = async (jobId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.get(`${baseUrl}/jobs/${jobId}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};

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

const updateApplicationStatus = async (id, status, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.put(`${baseUrl}/${id}`, status, config);
    return response.data;
  } catch (error) {
    console.error("Error updating application status:", error);
  }
};

export default {
  applyToJob,
  getApplication,
  getCandidateApplications,
  getJobApplications,
  updateApplicationStatus,
};
