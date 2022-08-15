import { createContext, useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";
import { NotificationContent } from "../types/NotificationTypes";

const AUTO_HIDE_DURATION = 30000;  // when snackbar will auto hide; 30 seconds
// const AUTO_HIDE_DURATION = 1000000000; // for debug purposes
const DISMISS_DURATION = AUTO_HIDE_DURATION + 200;  // when notification will be removed from queue. + 200ms necessary for animation and queue clearing.

type NotificationContextType = {
  showNotification: (content: NotificationContent) => void;
  clearNotifications: () => void;
  AUTO_HIDE_DURATION: number;
};

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
  clearNotifications: () => {},
  AUTO_HIDE_DURATION
});

type Props = {
  children: JSX.Element;
}

function NotificationContextProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<NotificationContent[]>([]);

  const activeNotificationIds = notifications.map((notification, index) => `notify${index}-${notification.title}`).join(",");
  useEffect(() => {
    if (activeNotificationIds.length > 0) {
      const timer = setTimeout(() =>
          setNotifications((notifications) => notifications.slice(0, notifications.length - 1)),
        DISMISS_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [activeNotificationIds]);

  const showNotification = (newNotificationContent: NotificationContent) => {
    setNotifications([...notifications, newNotificationContent]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  }

  const context = {
    showNotification,
    clearNotifications,
    AUTO_HIDE_DURATION
  };

  console.log("notifications in the context: ", notifications);

  return (
    <NotificationContext.Provider value={context}>
      {children}
      {notifications.map((notification, index) =>
        (<Notification key={`notification_${index}`} {...notification} />))}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationContextProvider };