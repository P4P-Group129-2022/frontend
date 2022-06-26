import { Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import { useChatState } from "../../hooks/usePersistedState";

function MessagePage() {
  const [messages, setMessages] = useChatState([]);

  const { currentScenario } = useContext(ScenarioContext);

  useEffect(() => {
    setMessages([...messages, ...currentScenario.chats]);
  }, [currentScenario]);

  return (
    <div>
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
    </div>
  );
}

export default MessagePage;
