import React from "react";
import styles from "./HomePage.module.css";
import CustomButton from "../../components/Buttons";
import PageContainer from "../../components/PageContainer";
import MainContentsContainer from "../../components/MainContentsContainer";
import {Typography} from "@mui/material";
import classes from "*.module.css";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const onPlaySoloClick = () => {
        navigate("/solo");
    };

    const onPlayMultiplayerClick = () => {
        navigate("/multiplayer");
    };

    return (
        <PageContainer>
            <MainContentsContainer>
                <Typography variant="h4" textAlign="center">
                    Let's Git it
                </Typography>
            </MainContentsContainer>
            <div className={classes.ButtonContainer}>
                <CustomButton onClick={onPlaySoloClick}>
                    Start Module
                </CustomButton>
                <CustomButton onClick={onPlayMultiplayerClick}>
                    Start Tests
                </CustomButton>
            </div>
        </PageContainer>
    );
}

export default HomePage;
