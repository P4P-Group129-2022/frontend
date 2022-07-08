import axios, { AxiosResponse } from "axios";
import { NotificationContent } from "../types/NotificationTypes";
import { ScenarioContent } from "../types/ScenarioTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getNotificationByName:
  (notificationName: string) => Promise<AxiosResponse<{ notificationFromDB: NotificationContent[] }>> =
  async (notificationName: string) =>
    await axios.get(`${API_ENDPOINT}/api/notification/${notificationName}`);

export const getScenarioByNameId:
  (scenarioNameId: string) => Promise<AxiosResponse<{ scenarioFromDB: ScenarioContent }>> =
  async (scenarioNameId: string) =>
    await axios.get<{ scenarioFromDB: ScenarioContent }>(`${API_ENDPOINT}/api/scenario/${scenarioNameId}`);

export const getRepoStatusForScenario:
  (scenarioNameId: string) => Promise<AxiosResponse<{ status: string }>> =
  async (scenarioNameId: string) =>
    await axios.get<{ status: string }>(`${API_ENDPOINT}/api/git/status`, {
      params: {
        scenarioNameId
        // username
      }
    });