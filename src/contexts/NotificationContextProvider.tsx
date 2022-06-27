import { createContext, useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";
import { NotificationContent } from "../types/NotificationTypes";

const AUTO_HIDE_DURATION = 3000;

type NotificationContextType = {
  showNotification: (content: NotificationContent) => void;
  AUTO_HIDE_DURATION: number;
};

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
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
          setNotifications(
            (notifications) => notifications.slice(0, notifications.length - 1)),
        AUTO_HIDE_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [activeNotificationIds]);


  const showNotification = (newNotificationContent: NotificationContent) => {
    setNotifications([...notifications, newNotificationContent]);
  };

  const context = {
    showNotification,
    AUTO_HIDE_DURATION
  };

  console.log("notifications: ", notifications);

  return (
    <NotificationContext.Provider value={context}>
      {children}
      {notifications.map((notification, index) =>
        (<Notification key={`notification_${index}`} {...notification} />))
      }
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationContextProvider };