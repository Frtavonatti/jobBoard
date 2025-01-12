import { useEffect } from "react"
import { useNotificationContext } from "../context/NotificationContext"

const Notification = ({ type }) => {
  const [state, dispatch] = useNotificationContext();

  useEffect(() => {
    if (state.visible) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.visible, dispatch]);

  if (!state.visible) return null;

  return (
    <div
      role={`alert ${type}`}
      className="alert fixed top-0 left-1/2 transform -translate-x-1/2 mt-2"
      style={{ zIndex: 1000 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>{state.message}</span>
    </div>
  );
};

export default Notification