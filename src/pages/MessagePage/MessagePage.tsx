import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider as MuiDivider,
  Skeleton,
  Typography
} from "@mui/material";
import React, { useContext } from "react";
import { MessageContext } from "../../contexts/MessageContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { SLACK_COLORS } from "../../theme/colors";
import MessageSidebar from "../../components/MessageSidebar";
import MessageInput from "../../components/MessageInput";
import MessageBlock from "../../components/MessageBlock";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";

const GitHubUrlSubstring = "github.com";
const PRUrlSubstring = "pull";

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

const Divider = styled(MuiDivider)({
  "& .MuiDivider-wrapper": {
    padding: 0,
  }
});

const DividerDate = styled(Chip)({
  backgroundColor: "#FFFFFF",
  border: "1px solid #e0e0e0",
  fontSize: "0.7rem",
  fontWeight: "700",
  height: "fit-content",
  padding: "0.25rem 0.5rem",
});

function MessagePage() {
  const { messages, addMessages } = useContext(MessageContext);
  const { checkIfPRIsCorrectlyMade } = useContext(ScenarioContext);
  const { user } = useContext(UserContext);

  // The very first sender of the chat is always the supervisor to chat with.
  const sender = messages[messages.length - 1]?.sender;

  console.log("messages", messages);
  console.log("message 1 date:", typeof messages[0]?.timestamp);

  const handleSend = (message: string) => {
    console.log("sending message: ", message);

    if (checkIfPRMessage(message)) checkIfPRIsCorrectlyMade(message.substring(message.lastIndexOf("/") + 1));

    addMessages([{
      sender: {
        name: !!user ? user.name : "player",
        nameId: !!user ? user.username : "player",
        profileImgUrl: !!user ? user.avatarUrl : "https://i.pravatar.cc/300?img=1"
      },
      content: message,
      timestamp: new Date()
    }]);
  };

  const checkIfPRMessage = (message: string) => message.includes(GitHubUrlSubstring) && message.includes(PRUrlSubstring);

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
            {messages.map((message, index) => <MessageBlock
                key={`message-${index}`}
                sender={message.sender}
                message={message.content}
                timestamp={message.timestamp}
              />
            )}
            <Box>
              <Divider>
                <DividerDate label={"Today"} />
              </Divider>
            </Box>
          </ChatContainer>
        </ScrollableChatContainer>

        <Divider />

        <MessageInput onSend={handleSend} />
      </MainChatContainer>
    </AppWindowFrame>
  );
}

export default MessagePage;
