import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { SLACK_COLORS } from "../../theme/colors";

function MessagePage() {
  const { messages } = useContext(MessageContext);

  return (
    <AppWindowFrame frameColor={SLACK_COLORS.darkPurple}>
      <Typography variant="h1">Messages</Typography>
      <Divider />
      {messages.map((message, index) => (
        <Card key={`message-${index}`} sx={{ margin: 2 }}>
          <CardContent>
            <Typography variant="h3">{message.message}</Typography>
            <Typography variant="h5">By: {message.sender}</Typography>
          </CardContent>
        </Card>
      ))}
    </AppWindowFrame>
  );
}

export default MessagePage;
