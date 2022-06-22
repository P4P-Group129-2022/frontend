export type ScenarioSegment = {
  chats: ChatDialog[];
  endRepoID: string /* ID of the comparing repository  */;
};

export type ChatDialog = {
  sender: string;
  message: string;
};
