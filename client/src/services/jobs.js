import axios from "axios";

const baseUrl = "http://localhost:3001/jobs";

const getJobs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

export default { getJobs };