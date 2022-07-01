import axios, {AxiosResponse} from 'axios';
import {NotificationContent} from "../types/NotificationTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getNotificationByName: (notificationName: string) =>
    Promise<AxiosResponse<{notification: NotificationContent}>> = async (notificationName: string) => {
    return await axios.get(`${API_ENDPOINT}/api/notification/`);
}