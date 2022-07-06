import { ChatDialog } from "./ChatTypes";
import { NotificationContent } from "./NotificationTypes";

export type ScenarioSegment = {
  chats: ChatDialog[];
  notification: NotificationContent[];
  endRepoID: string /* ID of the comparing repository  */;
};