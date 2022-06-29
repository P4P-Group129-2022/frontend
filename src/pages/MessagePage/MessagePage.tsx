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

        <Box
          display={"flex"}
          flexGrow={1}
          flexDirection={"column-reverse"}
          overflow={"auto"}
        >
          {messages.map((message, index) => (
            <Card key={`message-${index}`} sx={{ margin: 2 }}>
              <CardContent>
                <Typography variant="h4">{index + " - " + message.message}</Typography>
                <Typography variant="h6">By: {message.sender}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Divider />

        <MessageInput onSend={handleSend} />
      </Box>
    </AppWindowFrame>
  );
}

export default MessagePage;
