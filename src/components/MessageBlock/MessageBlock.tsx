import React, { useEffect } from "react";
import { Avatar, Box, Chip, Divider as MuiDivider, Typography } from "@mui/material";
import { ChatDialog } from "../../types/ChatTypes";
import { styled } from "@mui/material/styles";

type Props = {
  sender: { name: string; profileImgUrl: string };
  messages: string[];
  timestamp: Date;
  isSentByUser?: boolean;
};

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
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

const ChatSectionContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "0 1rem 0.5rem 1rem",
});


const NameContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
});

const Name = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 700,
  marginRight: "0.5rem",
});

const SentTime = styled(Typography)({
  fontSize: "0.75rem",
  color: "textSecondary",
});

const MessageText = styled(Typography)({
  fontSize: "1rem",
  marginBottom: "0.5rem",
});

function MessageBlock({ sender, messages, timestamp, isSentByUser }: Props) {
  return (
    <MainContainer>
      <Box>
        <Divider>
          <DividerDate label={"Today"} />
        </Divider>
      </Box>

      <ChatSectionContainer>
        <Avatar
          variant={"rounded"}
          alt={`Profile picture of ${sender.name}`}
          src={sender.profileImgUrl}
          sx={{
            width: "3rem",
            height: "3rem",
            marginRight: "0.5rem",
          }}
        />

        <Box flexGrow={1}>
          <NameContainer>
            <Name>{sender.name}</Name>
            <SentTime variant={"subtitle1"}>
              {timestamp.toLocaleTimeString("en-NZ", { hour: "numeric", minute: "numeric" })}
            </SentTime>
          </NameContainer>
          <Box id={"MessageContainer"}>
            {messages.map((message, index) => (
              <MessageText
                key={`message-${index}-by-${sender.name}`}
              >
                {message}</MessageText>
            ))}
          </Box>
        </Box>
      </ChatSectionContainer>
    </MainContainer>
  );
}

export default MessageBlock;