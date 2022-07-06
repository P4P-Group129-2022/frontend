import React from "react";
import CustomButton from "../../components/Buttons";
import { Box, Typography } from "@mui/material";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleSelectScenario = () => {
    navigate("/scenario-select");
  };

  const handleStartTests = () => {
    navigate("/tests");
  };

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
      </Box>

    </Box>
  );
}

export default HomePage;
