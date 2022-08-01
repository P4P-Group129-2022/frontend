import { Box, Divider, InputBase, SxProps, Theme, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import AppWindowFrame from "../../components/AppWindowFrame";
import { TERMINAL_COLORS } from "../../theme/colors";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ConsolePrint } from "../../types/TerminalTypes";
import { processCommands } from "../../utils/TerminalCommandProcessor";
import { UserContext } from "../../contexts/UserContextProvider";

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

const ConsoleLineContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginLeft: "-0.5rem",
});

const ConsoleInputLineContainer = styled(ConsoleLineContainer)({
  color: TERMINAL_COLORS.green,
});

const ConsoleOutputLineContainer = styled(ConsoleLineContainer)({
  color: TERMINAL_COLORS.text,
});

const ConsoleLineText = styled(Typography)({
  fontFamily: "inherit",
  fontSize: "1rem",
});

const ConsoleOutputLineText = styled(ConsoleLineText)({
  whiteSpace: "pre",
});

const ConsoleIOIcons: SxProps<Theme> = {
  marginTop: "3px",
  marginRight: "0.5rem",
};

function TerminalPage() {
  const { checkAndAdvanceScenario } = useContext(ScenarioContext);
  const { accessToken } = useContext(UserContext);
  const [consolePrints, setConsolePrints] = React.useState<ConsolePrint[]>([]);
  const [input, setInput] = React.useState("");

  const userProfile = "User@MacBook-Pro";
  const cwd = "~/Documents/project1";

  const addConsolePrint = (print: ConsolePrint) => {
    setConsolePrints([...consolePrints, print]);
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleOnInputKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length > 0) {
      const print = await processCommands(input, accessToken);
      addConsolePrint(print);
      setInput("");
    }
  };

  return (
    <AppWindowFrame frameColor={TERMINAL_COLORS.frame} title={`${userProfile}:${cwd}`}>
      <MainContainer>
        {/*<Typography variant={"h4"} fontFamily={"inherit"} marginBottom={"0.3rem"}>*/}
        {/*  <span style={{ fontWeight: 700, marginRight: "0.5rem" }}>Task:</span>*/}
        {/*  Commit changes to git repository*/}
        {/*</Typography>*/}

        {/*<TerminalDivider />*/}

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
              <ConsoleInputLineContainer>
                <ChevronRightIcon
                  fontSize={"medium"}
                  sx={ConsoleIOIcons}
                />
                <ConsoleLineText>
                  {consolePrint.input}
                </ConsoleLineText>
              </ConsoleInputLineContainer>
              <ConsoleOutputLineContainer>
                <ChevronLeftIcon
                  fontSize={"medium"}
                  sx={ConsoleIOIcons}
                />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"flex-start"}
                  alignItems={"flex-start"}
                  marginBottom={"1rem"}
                >
                  {consolePrint.output.map((output, index) => (
                    <ConsoleOutputLineText
                      sx={output.color ? { color: output.color } : undefined}
                      key={`${consolePrint.input}-output-${index}`}
                    >
                      {output.value}
                    </ConsoleOutputLineText>
                  ))}
                </Box>
              </ConsoleOutputLineContainer>
            </ConsoleOutputContainer>
          ))}
        </ConsoleOutputsContainer>
      </MainContainer>
    </AppWindowFrame>
  );
}

export default TerminalPage;
