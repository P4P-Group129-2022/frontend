import createPersistedState from "use-persisted-state";
import { ChatDialog } from "../types/ChatTypes";
import { User } from "../types/UserTypes";

const useChatState = createPersistedState<ChatDialog[]>("chatState");
const useUserState = createPersistedState<User>("userState");
const useAccessTokenState = createPersistedState<string>("accessTokenState");

export { useChatState, useUserState, useAccessTokenState };