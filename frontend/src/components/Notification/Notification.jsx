import { useSelector } from "react-redux";

function Notification() {
  const notification = useSelector((state) => state.notification);

  return (
    notification && (
      <div className={notification.type}>{notification.message}</div>
    )
  );
}

export default Notification;
