import { createContext } from "react";
import { ChatDialog } from "../types/ChatTypes";
import useChatStateWithRef from "../hooks/useChatStateWithRef";

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
  const [messages, setMessages, messagesRef] = useChatStateWithRef([]);

  const addMessages = (newMessages: ChatDialog[]) => {
    console.log("Message added", newMessages);
    setMessages([...newMessages, ...messagesRef.current]);
  };

  console.log("messages in context", messages);

  const clearMessage = () => {
    setMessages([]);
  };

  const context: MessageContextType = {
    addMessages,
    clearMessage,
    messages
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