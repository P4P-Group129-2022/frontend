import { createContext } from "react";
import { ChatDialog } from "../types/ChatTypes";
import { useChatState } from "../hooks/usePersistedState";

type MessageContextType = {
  addMessages: (messages: ChatDialog[]) => void;
  clearMessage: () => void;
  messages: ChatDialog[];
}

type Props = {
  children: JSX.Element;
}

const MessageContext = createContext<MessageContextType>({
  addMessages: () => {},
  clearMessage: () => {},
  messages: [],
});

function MessageContextProvider({ children }: Props) {
  const [messages, setMessages] = useChatState([]);

  const addMessages = (newMessages: ChatDialog[]) => {
    console.log("Message added", newMessages);
    setMessages([...newMessages, ...messages]);
  };

  console.log("messages in context", messages);

  const clearMessage = () => {
    setMessages([]);
  }

  const context = {
    addMessages,
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