import React, {useContext} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {inviteToOrganization} from "../../api/Api";
import {NotificationContext} from "../../contexts/NotificationContextProvider";

const MainContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: 2,
});

function ScenarioSelectPage() {
    const {showNotification} = useContext(NotificationContext);
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const sendInviteToOrganization = async (username: string) => {
        await inviteToOrganization(username);
        showNotification({
            title: "Check GitHub or your email!",
            message: "Please check GitHub or your email for the invite to our GitHub organisation. " +
                "If you did not get an invite, please check that you have entered in your correct GitHub username " +
                "When you have checked that you have been successfully invited, please start with scenario 1! :D",
            imageSrc: ""
        });
    };

    return (
        <MainContainer>
            <Typography variant={"h2"}>Please enter in your GitHub username</Typography>
            <TextField
                id={"github-username-input-field"}
                variant={"outlined"}
                multiline maxRows={2}
                value={username}
                onChange={handleUsernameChange}
                sx={{
                    marginRight: 2,
                }}
            />
            <div>
                <Button
                    variant={"contained"}
                    onClick={async () => {
                        await sendInviteToOrganization(username);
                    }}
                >
                    Submit
                </Button>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Back to Main
                </Button>
            </div>
        </MainContainer>
    );
}

export default ScenarioSelectPage;