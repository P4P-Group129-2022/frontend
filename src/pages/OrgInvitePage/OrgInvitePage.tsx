import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {inviteToOrganization} from "../../api/Api";

const MainContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: 2,
});

function ScenarioSelectPage() {
    const [username, setUsername] = React.useState("");
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const navigate = useNavigate();

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
                        await inviteToOrganization(username);
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