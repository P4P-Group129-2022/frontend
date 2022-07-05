import { Box, Button, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { SLACK_COLORS } from "../../theme/colors";
import MessageSidebar from "../../components/MessageSidebar";
import MessageInput from "../../components/MessageInput";
import MessageBlock from "../../components/MessageBlock";

function MessagePage() {
  const { messages, addMessage } = useContext(MessageContext);

  const handleSend = (message: string) => {
    console.log(message);
    addMessage({ senderId: "user", message, timestamp: new Date() });
  };

  return (
    <AppWindowFrame frameColor={SLACK_COLORS.darkPurple}>
      <MessageSidebar />

      <Box
        display={"flex"}
        flexDirection={"column"}
        maxHeight={"100%"}
        height={"100%"}
        width={"100%"}
      >
        <Box padding={2}>
          <Typography variant={"h3"}>George Clooney</Typography>
        </Box>

        <Divider />

        <Box    // Box that allows us to scroll in the chat window
          id={"scrollable-chat-container"}
          flexGrow={1}
          minHeight={0}
        >
          <Box    // Box that displays every chat window
            id={"chat-container"}
            display={"flex"}
            flexDirection={"column-reverse"}
            overflow={"auto scroll"}
            height={"100%"}
          >
            {messages.map((message, index) => {
              return <MessageBlock
                key={`message-${index}`}
                sender={{
                  name: message.senderId,
                  profileImgUrl: "https://i.pravatar.cc/300"
                }}
                messages={[message.message]}
                timestamp={new Date()}
              />;
            })}
          </Box>
        </Box>

        <Divider />

        <MessageInput onSend={handleSend} />
      </Box>
    </AppWindowFrame>
  );
}

export default MessagePage;
