import React, { useContext } from "react";
import { Avatar, Box, Typography, Button as MuiButton, styled, ButtonProps } from "@mui/material";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/useLogout";
import LinkToTestsDialog from "../../components/LinkToTestsDialog";
import InstructionsDialog from "../../components/InstructionsDialog";
import Button from "../../components/Button";

const GreetingBody = styled(Typography)({
  textAlign: "center",
  whiteSpace: "pre-wrap",
  fontWeight: "300",
  fontSize: "1.25rem",
});

const BoldSpan = styled("span")({
  fontWeight: 400,
  color: "black",
});

function HomePage() {
  const { user, loggedIn } = useContext(UserContext);
  const { login } = useLogin();
  const { logout } = useLogout();
  const [open, setOpen] = React.useState(false);
  const [openInstructions, setOpenInstructions] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const navigate = useNavigate();

  const handleSelectScenario = () => {
    navigate("/scenario-select");
  };

  const handleStartTests = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenInstruction = () => {
    setOpenInstructions(true);
  };

  const handleCloseInstruction = () => {
    setOpenInstructions(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginTop={1}
      >
        {loggedIn ? (
          <>
            <Avatar src={user.avatarUrl} sx={{ border: "1px solid #00000050", marginRight: 1 }} />
            <Typography variant="h5" align="center" color={"#000000AA"}>
              Username: {user.name}
            </Typography>
            <Button variant={"contained"} size={"medium"} onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant={"contained"} size={"medium"} onClick={login}>
            Login
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20vh",
        }}
      >
        <Typography
          variant="h1"
          textAlign="center"
          marginBottom={4}
          fontWeight={600}
        >
          Let's Git it
        </Typography>
        <GreetingBody marginBottom={4}>
          A scenario-based simulation tool to help you learn git in an industry-like way.<br />
          Please read this <span onClick={handleOpenInstruction} onMouseEnter={handleMouseEnter}
                                 onMouseLeave={handleMouseLeave} style={{
          cursor: isHovering ? "pointer" : "default",
          textDecoration: "underline",
          fontWeight: "bold",
        }}>instruction</span> before you start!
        </GreetingBody>
        <GreetingBody sx={{ marginBottom: "10vh", fontSize: "1rem", color: "#00000080" }}>
          FYI: <BoldSpan>Scenario</BoldSpan> will be <BoldSpan>enabled after</BoldSpan> you complete
          a <BoldSpan>pre-test</BoldSpan>.
          <br />
          If you didn't know what pre-test was, perhaps it's good idea to <BoldSpan> READ THE INSTRUCTION!</BoldSpan>
          <br />
          Also, please <BoldSpan>do</BoldSpan> the <BoldSpan>post-test after </BoldSpan>
          you complete all the <BoldSpan>scenarios</BoldSpan>.
        </GreetingBody>
        <InstructionsDialog open={openInstructions} onClose={handleCloseInstruction} />
        <Box className={classes.ButtonContainer}>
          <Button variant={"contained"} disabled={!user.completedPreTest} onClick={handleSelectScenario}>
            Select Scenario
          </Button>
          <Button variant={"contained"} disabled={!loggedIn} onClick={handleStartTests}>
            Start Tests
          </Button>
          <LinkToTestsDialog open={open} onClose={handleClose} />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
