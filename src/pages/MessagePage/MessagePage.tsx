import { Box, Button, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { SLACK_COLORS } from "../../theme/colors";
import MessageSidebar from "../../components/MessageSidebar";
import MessageInput from "../../components/MessageInput";

function MessagePage() {
  const { messages, addMessage } = useContext(MessageContext);

  const handleSend = (message: string) => {
    console.log(message);
    addMessage({ sender: "sender", message });
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
            {messages.map((message, index) => (
              <Box key={`message-${index}`} sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #ccccccbb",
                boxShadow: "3px 3px 8px 0px #e7e7e7",
                margin: 1,
                padding: 2,
              }}>
                <Typography variant="h4">{index + " - " + message.message}</Typography>
                <Typography variant="h6">By: {message.sender}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider />

        <MessageInput onSend={handleSend} />
      </Box>
    </AppWindowFrame>
  );
}

export default MessagePage;
