import { Colleague } from "./ColleagueTypes";

export type ChatDialog = {
  sender: Colleague;
  content: string;
  timestamp: Date;
};