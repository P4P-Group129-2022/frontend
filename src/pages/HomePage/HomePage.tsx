import React from "react";
import CustomButton from "../../components/Buttons";
import PageContainer from "../../components/PageContainer";
import MainContentsContainer from "../../components/MainContentsContainer";
import {Typography} from "@mui/material";
import classes from "./HomePage.module.css";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const handleStartModule = () => {
        navigate("/play");
    };

    const handleStartTests = () => {
        navigate("/tests");
    };

    return (
        <PageContainer>
            <MainContentsContainer>
                <Typography variant="h4" textAlign="center">
                    Let's Git it
                </Typography>
            </MainContentsContainer>
            <div className={classes.ButtonContainer}>
                <CustomButton onClick={handleStartModule}>
                    Start Module
                </CustomButton>
                <CustomButton onClick={handleStartTests}>
                    Start Tests
                </CustomButton>
            </div>
        </PageContainer>
    );
}

export default HomePage;
