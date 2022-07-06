import { Avatar, Badge, Box, Button, Card, CardContent, Divider, Skeleton, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../contexts/MessageContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { SLACK_COLORS } from "../../theme/colors";
import MessageSidebar from "../../components/MessageSidebar";
import MessageInput from "../../components/MessageInput";
import MessageBlock from "../../components/MessageBlock";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MainChatContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  maxHeight: "100%",
  height: "100%",
  width: "100%",
});

// Box that allows us to scroll in the chat window
const ScrollableChatContainer = styled(Box)({
  flexGrow: 1,
  minHeight: 0,
});

// Box that displays every chat window
const ChatContainer = styled(Box)({
  display: "flex",
  flexDirection: "column-reverse",
  overflow: "auto scroll",
  height: "100%",
});

function MessagePage() {
  const [sender, setSender] = useState<{ name: string; profileImgUrl: string }>();
  const { messages, addMessage } = useContext(MessageContext);

  useEffect(() => {
    setTimeout(() => {
      // TODO: Fetch sender details from server
      setSender({ name: "George Clooney", profileImgUrl: "https://i.pravatar.cc/300" });
    }, 0);
  }, []);

  const handleSend = (message: string) => {
    console.log(message);
    addMessage({ senderId: "user", message, timestamp: new Date() });
  };

  return (
    <AppWindowFrame frameColor={SLACK_COLORS.darkPurple}>
      <MessageSidebar />

      <MainChatContainer>
        <Box
          padding={"0.5rem 1rem"}
          display="flex"
          flexDirection="row"
          alignItems={"center"}
        >
          <Badge
            variant={"dot"}
            color={"primary"}
            overlap={"circular"}
            anchorOrigin={{ "vertical": "bottom", "horizontal": "right" }}
            sx={{
              "& .MuiBadge-dot": {
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "50%",
              },
            }}
          >
            {!sender ? (
              <Skeleton variant={"rectangular"} sx={{ width: "2rem", height: "2rem", borderRadius: "4px" }} />
            ) : (
              <Avatar
                variant={"rounded"}
                alt={`Profile image of John`}
                src={sender.profileImgUrl}
                sx={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
            )}
          </Badge>

          {!sender ? (
            <Skeleton
              variant={"text"}
              sx={{
                width: "10rem",
                height: "1.5rem",
                marginLeft: "0.75rem",
                marginRight: "0.25rem"
              }}
            />
          ) : (
            <Typography
              variant={"h3"}
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                marginLeft: "0.75rem",
                marginRight: "0.25rem",
              }}
            >
              {sender.name}
            </Typography>
          )}

          <ExpandMoreIcon />
        </Box>

        <Divider />

        <ScrollableChatContainer>
          <ChatContainer>
            {messages.map((message, index) => {
              return <MessageBlock
                key={`message-${index}`}
                sender={sender ?? { name: "", profileImgUrl: "" }}
                messages={[message.message]}
                timestamp={new Date()}
              />;
            })}
          </ChatContainer>
        </ScrollableChatContainer>

        <Divider />

        <MessageInput onSend={handleSend} />
      </MainChatContainer>
    </AppWindowFrame>
  );
}

export default MessagePage;
