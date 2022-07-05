import createPersistedState from 'use-persisted-state';
import { ChatDialog } from "../types/ChatTypes";

const useChatState = createPersistedState<ChatDialog[]>("chatState");

export { useChatState }