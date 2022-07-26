import { createContext } from "react";
import { ChatDialog } from "../types/ChatTypes";
import { useChatState } from "../hooks/usePersistedState";

type MessageContextType = {
  addMessage: (message: ChatDialog) => void;
  clearMessage: () => void;
  messages: ChatDialog[];
}

type Props = {
  children: JSX.Element;
}

const MessageContext = createContext<MessageContextType>({
  addMessage: () => {},
  clearMessage: () => {},
  messages: [],
});

function MessageContextProvider({ children }: Props) {
  const [messages, setMessages] = useChatState([]);

  const addMessage = (message: ChatDialog) => {
    console.log("Message added", message);
    setMessages([message, ...messages]);
  };

  const clearMessage = () => {
    setMessages([]);
  }

  const context = {
    addMessage,
    clearMessage,
    messages: messages.map((chat) => ({ ...chat, timestamp: new Date(chat.timestamp) })),
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