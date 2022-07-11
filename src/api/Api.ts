import axios, { AxiosResponse } from "axios";
import { NotificationContent } from "../types/NotificationTypes";
import { ScenarioContent } from "../types/ScenarioTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getNotificationByName:
  (notificationName: string) =>
    Promise<AxiosResponse<{ notificationFromDB: NotificationContent[] }>> =
  async (notificationName: string) =>
    await axios.get(`${API_ENDPOINT}/api/notification/${notificationName}`);

export const getScenarioByNameId:
  (scenarioNameId: string) =>
    Promise<AxiosResponse<{ scenarioFromDB: ScenarioContent }>> =
  async (scenarioNameId: string) =>
    await axios.get<{ scenarioFromDB: ScenarioContent }>(`${API_ENDPOINT}/api/scenario/${scenarioNameId}`);

export const getRepoStatusForScenario:
  (scenarioNameId: string) =>
    Promise<AxiosResponse<{ status: string }>> =
  async (scenarioNameId: string) =>
    await axios.get<{ status: string }>(`${API_ENDPOINT}/api/git/status/${scenarioNameId}`);

export const stageFileInRepo:
  (scenarioNameId: string, fileName: string) =>
    Promise<AxiosResponse<{ fileName: string } | void>> =
  async (scenarioNameId: string, fileName: string) =>
    await axios.post(`${API_ENDPOINT}/api/git/stage`, {
      scenarioNameId,
      fileName
    });

export const stageAllFilesInRepo:
  (scenarioNameId: string) =>
    Promise<AxiosResponse<void>> =
  async (scenarioNameId: string) =>
    await axios.post(`${API_ENDPOINT}/api/git/stage-all`, {
      scenarioNameId
    });

export const commitRepo:
  (scenarioNameId: string, message: string, author: { name: string, email: string }) =>
    Promise<AxiosResponse<{ commitId: string, stats: { file: number, plus: number, minus: number } }>> =
  async (scenarioNameId, message, author) =>
    await axios.post(`${API_ENDPOINT}/api/git/commit`, {
      scenarioNameId,
      message,
      author
    });

export const stageAllAndCommitRepo:
  (scenarioNameId: string, message: string, author: { name: string, email: string }) =>
    Promise<AxiosResponse<{ commitId: string, stats: { file: number, plus: number, minus: number } }>> =
  async (scenarioNameId, message, author) =>
    await axios.post(`${API_ENDPOINT}/api/git/stage-all-and-commit`, {
      scenarioNameId,
      message,
      author
    });
