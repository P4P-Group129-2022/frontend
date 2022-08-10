import React from "react";
import { Dialog, DialogContent, DialogTitle, styled, Typography } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
};

const InstructionLine = styled(Typography)({
  fontWeight: 300,
  fontSize: "1rem",
  marginBottom: "0.4rem",
});

function InstructionsDialog({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Instructions</DialogTitle>
      <DialogContent>
        <InstructionLine>
          As this tool was developed to test the topic for Software Engineering Part 4 Project,
          it is vital that you carefully read all the instructions before you start using the tool.
        </InstructionLine>
        <InstructionLine>
          If you haven't viewed our introduction video, please click this link:<br />
          {/* Change bottom link to the link of the actual video. */}
          <a href="https://youtu.be/18WX-hjiBi8" target={"_blank"} style={{ color: "black", fontSize: "1rem" }}>
            https://youtu.be/18WX-hjiBi8
          </a>
        </InstructionLine>
        <InstructionLine>
          Following is the list of tasks which you must complete <span style={{ fontWeight: 600 }}>in order</span>.
        </InstructionLine>
        <ol>
          <li>
            <InstructionLine>
              Login using GitHub account. This will prompt a GitHub Organisation invite email to be sent. Accept the
              invite before attempting any of the scenarios.
            </InstructionLine>
          </li>
          <li>
            <InstructionLine>
              Complete a pre-test survey by clicking "START TESTS" button and selecting "pre-test" option.
            </InstructionLine>
          </li>
          <li>
            <InstructionLine>
              Once "SELECT SCENARIO" button unlocks, play each scenario in order. (Scenario 1 → Scenario 2 → Scenario
              3).
            </InstructionLine>
          </li>
          <li>
            <InstructionLine>
              Complete a post-test survey by clicking "START TESTS" button and selecting "post-test" option.
            </InstructionLine>
          </li>
        </ol>
        <InstructionLine>
          You can always resume the tasks by logging in to your GitHub account.
          That's it! Please enjoy!
        </InstructionLine>
      </DialogContent>
    </Dialog>
  );
}

export default InstructionsDialog;