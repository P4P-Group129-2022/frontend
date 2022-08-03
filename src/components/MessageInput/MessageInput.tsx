import React from "react";
import { Box, Button, TextField } from "@mui/material";

type Props = {
  onSend: (message: string) => void;
};

function MessageInput({ onSend }: Props) {
  const [message, setMessage] = React.useState("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleSend();
  };

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      padding={2}
    >
      <TextField
        id={"message-input-field"}
        label={"Enter chat..."}
        variant={"outlined"}
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleEnterKey}
        fullWidth
        sx={{
          marginRight: 2,
        }}
      />

      <Button
        variant={"contained"}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  );
}

export default MessageInput;