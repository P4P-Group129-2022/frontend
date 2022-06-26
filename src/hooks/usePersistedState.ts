import createPersistedState from 'use-persisted-state';
import { ChatDialog } from "../types/ScenarioTypes";

const useChatState = createPersistedState<ChatDialog[]>("chatState");

export { useChatState }