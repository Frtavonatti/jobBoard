const getTimeDiff = (date) => {
  const now = new Date();
  const applicationDate = new Date(date);
  const diffInMinutes = Math.floor((now - applicationDate) / (1000 * 60));
  const diffInHours = Math.floor((now - applicationDate) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
};

export default getTimeDiff;