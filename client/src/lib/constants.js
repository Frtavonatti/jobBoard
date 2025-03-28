export const columns = [
  { id: "applied", title: "New Applications" },
  { id: "discarded", title: "Discarded" },
  { id: "screening", title: "Screening" },
  { id: "interview", title: "Interview" },
  { id: "offer", title: "Offer" },
  { id: "hired", title: "Hired" },
];

export const STATUS_COLORS = {
  applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  screening: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  interview: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  hired: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  discarded: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export const statusColor = (status) => {
  return STATUS_COLORS[status] ||
  "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
} 