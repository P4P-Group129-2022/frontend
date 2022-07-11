import axios, { AxiosResponse } from "axios";
import { NotificationContent } from "../types/NotificationTypes";
import { ScenarioContent } from "../types/ScenarioTypes";
import { Author, CommitResponse } from "../types/GitTypes";

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
  (username: string) =>
    Promise<AxiosResponse<{ status: string }>> =
  async (username: string) =>
    await axios.get<{ status: string }>(`${API_ENDPOINT}/api/git/status/${username}`);

export const stageFileInRepo:
  (username: string, fileName: string) =>
    Promise<AxiosResponse<{ fileName: string } | void>> =
  async (username: string, fileName: string) =>
    await axios.post(`${API_ENDPOINT}/api/git/stage`, {
      username,
      fileName
    });

export const stageAllFilesInRepo:
  (username: string) =>
    Promise<AxiosResponse<void>> =
  async (username: string) =>
    await axios.post<void>(`${API_ENDPOINT}/api/git/stage-all`, {
      username
    });

export const commitRepo = async (username: string, message: string, author: Author) =>
  await axios.post<CommitResponse>(`${API_ENDPOINT}/api/git/commit`, {
    username,
    message,
    author
  });

export const stageAllAndCommitRepo = async (username: string, message: string, author: Author) =>
  await axios.post<CommitResponse>(`${API_ENDPOINT}/api/git/stage-all-and-commit`, {
    username,
    message,
    author
  });
