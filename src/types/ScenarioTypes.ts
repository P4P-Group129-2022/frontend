import { ChatDialog } from "./ChatTypes";

export type ScenarioSegment = {
  chats: ChatDialog[];
  endRepoID: string /* ID of the comparing repository  */;
};