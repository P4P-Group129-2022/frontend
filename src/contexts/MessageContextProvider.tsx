import { createContext, useState } from "react";
import { ChatDialog } from "../types/ScenarioTypes";
import { useChatState } from "../hooks/usePersistedState";

type MessageContextType = {
  addMessage: (message: ChatDialog) => void;
  messages: ChatDialog[];
}

type Props = {
  children: JSX.Element;
}

const MessageContext = createContext<MessageContextType>({
  addMessage: () => {},
  messages: [],
});

function MessageContextProvider({ children }: Props) {
  const [messages, setMessages] = useChatState([]);

  const addMessage = (message: ChatDialog) => {
    console.log('Message added', message);
    setMessages([message, ...messages]);
  };

  const context = {
    addMessage,
    messages,
  };

  return (
    <MessageContext.Provider value={context}>
      {children}
    </MessageContext.Provider>
  );
}

export {
  MessageContext,
  MessageContextProvider,
};