import React, { useContext } from "react";
import CustomButton from "../../components/Buttons";
import { Box, Typography } from "@mui/material";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/useLogout";

function HomePage() {
  const { user } = useContext(UserContext);
  const { login, error, isPending } = useLogin();
  const { logout } = useLogout();

  const navigate = useNavigate();

  const handleSelectScenario = () => {
    navigate("/scenario-select");
  };

  const handleStartTests = () => {
    navigate("/tests");
  };

  console.log("user", user);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Typography
        variant="h1"
        textAlign="center"
        marginBottom={20}
      >
        Let's Git it
      </Typography>
      <Box className={classes.ButtonContainer}>
        <CustomButton onClick={handleSelectScenario}>
          Select Scenario
        </CustomButton>
        <CustomButton onClick={handleStartTests}>
          Start Tests
        </CustomButton>
        <CustomButton onClick={login}>
          Login
        </CustomButton>
        <CustomButton onClick={logout}>
          Logout
        </CustomButton>
      </Box>
      {!!user && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          marginTop={10}
        >
          {/*<img src={user.avatar ?? ""} alt="gitit" height={160} />*/}
          <Box
            display={"flex"}
            flexDirection={"column"}
            marginLeft={10}
          >
            <Typography variant={"body1"}>username: {user.username}</Typography>
            <Typography variant={"body1"}>email: {user.email}</Typography>
            <Typography variant={"body1"}>name: {user.name}</Typography>
          </Box>
        </Box>
      )}
      {error !== undefined && (<Typography variant={"h3"} color={"#ff0000"}>{error}</Typography>)}
      {isPending && (<Typography variant={"h3"} color={"#202020"}>Loading...</Typography>)}
    </Box>
  );
}

export default HomePage;
