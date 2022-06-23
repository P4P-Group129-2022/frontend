import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";

/**
 * For now, we'll just have buttons.
 */
function TerminalPage() {
  const { checkAndAdvanceScenario } = useContext(ScenarioContext);

  const handleOnGitPushClick = () => {
    // possibly handle push request to api as well?
    checkAndAdvanceScenario();
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => alert("clicked git status")}>
        git status
      </Button>
      <Button variant="contained" onClick={() => alert("clicked git commit")}>
        git commit
      </Button>
      <Button variant="contained" onClick={handleOnGitPushClick}>
        git push
      </Button>
    </Box>
  );
}

export default TerminalPage;
