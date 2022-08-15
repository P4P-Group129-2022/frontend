import { Box, Divider, InputBase, SxProps, Theme, Typography } from "@mui/material";
import { KeyboardEvent, ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import AppWindowFrame from "../../components/AppWindowFrame";
import { TERMINAL_COLORS } from "../../theme/colors";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ConsolePrint } from "../../types/TerminalTypes";
import { useTerminalCommandProcessor } from "../../hooks/useTerminalCommandProcessor";
import { UserContext } from "../../contexts/UserContextProvider";
import { getCurrentBranch } from "../../api/Api";

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
  whiteSpace: "pre-line",
});

const ConsoleIOIcons: SxProps<Theme> = {
  marginTop: "3px",
  marginRight: "0.5rem",
};

function TerminalPage() {
  const { processCommands } = useTerminalCommandProcessor();
  const { user } = useContext(UserContext);
  const [consolePrints, setConsolePrints] = useState<ConsolePrint[]>([]);
  const [input, setInput] = useState("");
  const [branch, setBranch] = useState("...");
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCurrentBranch(user.username)
      .then(res => res.data)
      .then(branch => setBranch(branch));
  }, []);

  const userProfile = `${user?.name ?? "User"}@MacBook-Pro`;
  const cwd = "~/Documents/LGI-project";

  const addConsolePrint = (print: ConsolePrint) => {
    setConsolePrints([...consolePrints, print]);
  };

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleOnInputKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && input.length > 0) {
      setInput("");
      const print = await processCommands(input);
      if (input.startsWith("git checkout ")) {
        const { data: branch } = await getCurrentBranch(user.username);
        setBranch(branch);
      }
      addConsolePrint(print);
      consoleRef.current && consoleRef.current.scroll({ top: 10000000, behavior: "smooth" });
    }
  };

  return (
    <AppWindowFrame frameColor={TERMINAL_COLORS.frame} title={`${userProfile}:${cwd}`}>
      <MainContainer>
        <InputContainer>
          <Typography fontSize={"1rem"} marginRight={"0.5rem"} fontFamily={"inherit"}>
            {/* This mimics the zsh shell that default Mac terminal comes with. */}
            <span style={{ color: TERMINAL_COLORS.blue }}>{cwd}{" "}</span>
            <span style={{ color: TERMINAL_COLORS.green }}>on branch: {branch}</span> %
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

        <ConsoleOutputsContainer ref={consoleRef}>
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
          <Box height={"10rem"} />
        </ConsoleOutputsContainer>
      </MainContainer>
    </AppWindowFrame>
  );
}

export default TerminalPage;
