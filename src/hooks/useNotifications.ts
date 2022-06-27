import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContextProvider";

const useNotifications = () => useContext(NotificationContext);

export default useNotifications;