import axios from 'axios';

const baseUrl = "http://localhost:3001/api/candidates";

const getLikedJobs = async (token) => {
  try {
    const res = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error getting liked jobs:", error);
  }
}

const toggleLikeJob = async (jobId, token) => {
  try {
    const res = await axios.post(`${baseUrl}/like`, { jobId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error liking job:", error);
  }
}

export default { 
  getLikedJobs,
  toggleLikeJob 
};