import axios from "axios";

const baseUrl = "http://localhost:3001/api/jobs";

const getJobs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
};

const createJob = async (newJob) => {
  try {
    const response = await axios.post(baseUrl, newJob);
    return response.data;
  } catch (error) {
    console.log("Error posting data:", error);
  }
};

const deleteJob = async (id) => {
  try {
    const response = axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting data:", error);
  }
};

export default { getJobs, createJob, deleteJob };
