import { createContext, useState } from "react";
import { ChatDialog } from "../types/ScenarioTypes";

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
  const [messages, setMessages] = useState<ChatDialog[]>([]);

  const addMessage = (message: ChatDialog) => {
    setMessages([...messages, message]);
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