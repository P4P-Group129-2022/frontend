import React from "react";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import { UserContext } from "../../contexts/UserContextProvider";

type Props = {
  open: boolean;
  onClose: () => void;
};

function LinkToTestsDialog({ open, onClose }: Props) {
  const { completePreTest } = React.useContext(UserContext);

  const handleCompletePreTest = async () => {
    await completePreTest();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please select appropriate test link.</DialogTitle>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        marginX={4}
        marginY={3}
      >
        <Button
          variant={"contained"}
          color={"secondary"}
          size={"large"}
          target={"_blank"}
          onClick={handleCompletePreTest}
          href={"https://forms.gle/sqdtQKdtJd1d5TjS8"}
        >
          Pre-test
        </Button>
        <Button
          variant={"contained"}
          color={"secondary"}
          size={"large"}
          target={"_blank"}
          href={"https://forms.gle/CCBWppvFWhVwuZi46"}
        >
          Post-test
        </Button>
      </Box>
    </Dialog>
  );
}

export default LinkToTestsDialog;