import { Info } from "lucide-react";
import { useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";

const Notification = () => {
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
      role={`alert`}
      className="alert fixed left-1/2 top-0 m-2 -translate-x-1/2 transform p-10 lg:p-6"
      style={{ zIndex: 1000 }}
    >
      <Info />
      <span>{state.message}</span>
    </div>
  );
};

export default Notification;
