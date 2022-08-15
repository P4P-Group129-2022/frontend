import { createContext, useState, useEffect } from "react";
import Notification from "../components/Notification/Notification";
import { NotificationContent } from "../types/NotificationTypes";
import { getNotificationByName } from "../api/Api";

const AUTO_HIDE_DURATION = 3000 * 20;  // when snackbar will auto hide
// const AUTO_HIDE_DURATION = 1000000000; // for debug purposes
const DISMISS_DURATION = AUTO_HIDE_DURATION + 200;  // when notification will be removed from queue. + 200ms necessary for animation and queue clearing.

type NotificationContextType = {
  showNotification: (content: NotificationContent) => void;
  showNotificationByName: (notificationName: string) => void;
  AUTO_HIDE_DURATION: number;
};

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
  showNotificationByName: () => {},
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
        DISMISS_DURATION
      );
      return () => clearTimeout(timer);
    }
  }, [activeNotificationIds]);

  const showNotification = (newNotificationContent: NotificationContent) => {
    setNotifications([...notifications, newNotificationContent]);
  };

  const showNotificationByName = async (notificationName: string) => {
    const notification = await getNotificationByName(notificationName);
    console.log(notification);
    setNotifications([...notifications, ...notification.data.notificationFromDB]);
  };

  const context = {
    showNotification,
    showNotificationByName,
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