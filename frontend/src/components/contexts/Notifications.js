import { useSelector } from "react-redux";
import styles from "@/styles/Notification.module.css";
import Notification from "./Notification";
const Notifications = () => {
  const notifications = useSelector((state) => state.profile.notifications);

  return (
    <div className={styles["notification-wrapper"]}>
      {notifications.map((note) => (
        <Notification key={note.id} {...note} />
      ))}
    </div>
  );
};

export default Notifications;
