import axios, { AxiosResponse } from "axios";
import { NotificationContent } from "../types/NotificationTypes";
import { ScenarioContent } from "../types/ScenarioTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getNotificationByName: (notificationName: string) =>
  Promise<AxiosResponse<{ notificationFromDB: NotificationContent[] }>> = async (notificationName: string) => {
  return await axios.get(`${API_ENDPOINT}/api/notification/${notificationName}`);
};

export const getScenarioByNameId: (scenarioNameId: string) =>
  Promise<AxiosResponse<{ scenarioFromDB: ScenarioContent }>> = async (scenarioNameId: string) => {
  return await axios.get<{ scenarioFromDB: ScenarioContent }>(`${API_ENDPOINT}/api/scenario/${scenarioNameId}`);
};