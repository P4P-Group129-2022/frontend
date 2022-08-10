import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { useChatState } from "./usePersistedState";
import { ChatDialog } from "../types/ChatTypes";

function useChatStateWithRef(initialValue: ChatDialog[]): [ChatDialog[], Dispatch<SetStateAction<ChatDialog[]>>, MutableRefObject<ChatDialog[]>] {
  const ref = useRef(initialValue);
  const [state, setState] = useChatState(initialValue);

  const updateState = (newState: SetStateAction<ChatDialog[]>) => {
    ref.current = typeof newState === "function" ? newState(state) : newState;
    setState(ref.current);
  };

  return [state, updateState, ref];
}

export default useChatStateWithRef;