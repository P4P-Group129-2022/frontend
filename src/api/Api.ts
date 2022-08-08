import axios from "axios";
import {NotificationResponse} from "../types/NotificationTypes";
import {ScenarioResponse, ScenarioDetailsResponse} from "../types/ScenarioTypes";
import {Author, CommitResponse, StageResponse, StatusResponse} from "../types/GitTypes";
import {GitHubResponse} from "../types/GitHubTypes";
import {File} from "../types/FileTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getNotificationByName = async (notificationName: string) =>
    await axios.get<NotificationResponse>(`${API_ENDPOINT}/api/notification/${notificationName}`);

export const getScenarioDetails = async () =>
    await axios.get<ScenarioDetailsResponse>(`${API_ENDPOINT}/api/scenario`);

export const getScenarioByNameId = async (scenarioNameId: string) =>
    await axios.get<ScenarioResponse>(`${API_ENDPOINT}/api/scenario/${scenarioNameId}`);

export const retrieveFile = async (username: string) =>
    await axios.get<File[]>(`${API_ENDPOINT}/api/file/retrieve?username=${username}`);

export const modifyFile = async (username: string, content: string) =>
    await axios.post(`${API_ENDPOINT}/api/file/modify`, {
        username,
        content
    });

export const initRepoForScenario = async (username: string, scenarioNameId: string) =>
    await axios.post(`${API_ENDPOINT}/api/git/init`, {
        username,
        scenarioNameId
    });

export const addRemote = async (username: string, remoteUrl: string) =>
    await axios.post(`${API_ENDPOINT}/api/git/add-remote`, {
        username,
        remoteUrl
    });

export const getRepoStatusForScenario = async (username: string) =>
    await axios.get<StatusResponse>(`${API_ENDPOINT}/api/git/status/${username}`);

export const stageFileInRepo = async (username: string, fileName: string) =>
    await axios.post<StageResponse>(`${API_ENDPOINT}/api/git/stage`, {
        username,
        fileName
    });

export const stageAllFilesInRepo = async (username: string) =>
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

export const pushRepo = async (username: string, remote: string, branch: string, accessToken: string) =>
    await axios.post<void>(`${API_ENDPOINT}/api/git/push`, {
        username,
        remote,
        branch,
        accessToken
    });

export const branch = async (username: string, newBranchName: string) =>
    await axios.post<void>(`${API_ENDPOINT}/api/git/branch`, {
        username,
        newBranchName
    });

export const checkout = async (username: string, branch: string) =>
    await axios.post<void>(`${API_ENDPOINT}/api/git/checkout`, {
        username,
        branch
    });

export const rebase = async (username: string, branch: string) =>
    await axios.post<void>(`${API_ENDPOINT}/api/git/rebase`, {
        username,
        branch
    });

export const getCurrentBranch = async (username: string, fullname?: boolean) =>
    await axios.get<string>(`${API_ENDPOINT}/api/git/currentBranch/${username}${fullname ? `?fullname=${fullname}` : ""}`);

export const checkPR = async (pullNumber: string, username: string) =>
    await axios.get<GitHubResponse>(`${API_ENDPOINT}/api/github/${username}/${pullNumber}`);

export const inviteToOrganization = async (username: string) =>
    await axios.get<GitHubResponse>(`${API_ENDPOINT}/api/github/invite/${username}`);

export const createUser = async (username: string, email: string) =>
    await axios.post<void>(`${API_ENDPOINT}/api/user/create`, {
        username,
        email
    });