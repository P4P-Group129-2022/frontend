import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colleague } from "../../types/ColleagueTypes";

type Props = {
  sender: Colleague;
  message: string;
  timestamp: Date | string;
};

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
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

function MessageBlock({ sender, message, timestamp }: Props) {
  // TODO: If chats were recovered from local storage, the timestamp could be string.
  //  Change it later so that it is always a Date object.
  typeof timestamp === "string" && (timestamp = new Date(timestamp));

  return (
    <MainContainer>
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
              {timestamp?.toLocaleTimeString("en-NZ", {
                hour: "numeric",
                minute: "numeric"
              })}
            </SentTime>
          </NameContainer>
          <Box>
            <MessageText>{message}</MessageText>
          </Box>
        </Box>
      </ChatSectionContainer>
    </MainContainer>
  );
}

export default MessageBlock;