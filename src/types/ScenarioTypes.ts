import { ChatDialog } from "./ChatTypes";
import { NotificationContent } from "./NotificationTypes";

export type ScenarioSegment = {
  chats: ChatDialog[];
  notifications: NotificationContent[];
  taskType: string /* ID of the comparing repository  */;
};

export type ScenarioContent = {
  nameId: string;
  name: string;
  segments: ScenarioSegment[];
}

export type ScenarioResponse = {
  scenarioFromDB: ScenarioContent
}