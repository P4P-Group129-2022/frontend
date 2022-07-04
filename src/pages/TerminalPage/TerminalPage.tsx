import { Box, Divider, InputBase, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { TERMINAL_COLORS } from "../../theme/colors";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ConsolePrint } from "../../types/TerminalTypes";
import { processCommands } from "../../utils/TerminalCommandProcessor";

const TerminalDivider = styled(Divider)({
  margin: "0.5rem 0",
  backgroundColor: TERMINAL_COLORS.divider,
});

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  padding: "12px 20px",
  backgroundColor: TERMINAL_COLORS.background,
  color: TERMINAL_COLORS.text,
  fontFamily: "Roboto Mono",
});

const InputContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  fontFamily: "inherit",
});

const Input = styled(InputBase)({
  fontSize: "1rem",
  color: TERMINAL_COLORS.text,
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  fontFamily: "inherit",
});

const ConsoleOutputsContainer = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
});

const ConsoleOutputContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ConsoleLine = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  fontFamily: "inherit",
  fontSize: "1rem",
  marginLeft: "-0.5rem",
});

const ConsoleInput = styled(ConsoleLine)({
  color: TERMINAL_COLORS.green,
});

const ConsoleOutput = styled(ConsoleLine)({
  color: TERMINAL_COLORS.text,
});

function TerminalPage() {
  const { checkAndAdvanceScenario } = useContext(ScenarioContext);
  const [consolePrints, setConsolePrints] = React.useState<ConsolePrint[]>([]);
  const [input, setInput] = React.useState("");

  const userProfile = "User@MacBook-Pro";
  const cwd = "~/Documents/project1";

  const addConsolePrint = (print: ConsolePrint) => {
    setConsolePrints([...consolePrints, print]);
  }

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleOnInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length > 0) {
      const print = processCommands(input);
      addConsolePrint(print);
      setInput("");
    }
  };

  return (
    <AppWindowFrame frameColor={TERMINAL_COLORS.frame} title={`${userProfile}:${cwd}`}>
      <MainContainer>
        <Typography variant={"h4"} fontFamily={"inherit"} marginBottom={"0.3rem"}>
          <span style={{ fontWeight: 700, marginRight: "0.5rem" }}>Task:</span>
          Commit changes to git repository
        </Typography>

        <TerminalDivider />

        <InputContainer>
          <Typography fontSize={"1rem"} marginRight={"0.5rem"} fontFamily={"inherit"}>
            {/* This mimics the zsh shell that default Mac terminal comes with. */}
            <span style={{ color: TERMINAL_COLORS.green }}>{userProfile}</span>
            <span style={{ color: TERMINAL_COLORS.blue }}>{cwd}</span> %
          </Typography>
          <Input
            placeholder={"Click here to enter..."}
            inputProps={{ "aria-label": "terminal-input" }}
            value={input}
            onChange={handleOnInputChange}
            onKeyDown={handleOnInputKeyDown}
          />
        </InputContainer>

        <TerminalDivider />

        <ConsoleOutputsContainer>
          {consolePrints.map((consolePrint, index) => (
            <ConsoleOutputContainer key={index}>
              <ConsoleInput>
                <ChevronRightIcon
                  fontSize={"medium"}
                  sx={{ marginRight: "0.5rem" }}
                />
                {consolePrint.input}
              </ConsoleInput>
              <ConsoleOutput>
                <ChevronLeftIcon
                  fontSize={"medium"}
                  sx={{ marginRight: "0.5rem" }}
                />
                {consolePrint.output}
              </ConsoleOutput>
            </ConsoleOutputContainer>
          ))}
        </ConsoleOutputsContainer>
      </MainContainer>
    </AppWindowFrame>
  );
}

export default TerminalPage;
