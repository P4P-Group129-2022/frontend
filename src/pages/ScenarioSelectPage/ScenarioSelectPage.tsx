import React, {useContext, useState} from "react";
import { Box, Button, Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import useGet from "../../hooks/useGet";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import {addRemote, getScenarioDetails, getScenarioByNameId, initRepoForScenario, retrieveFile} from "../../api/Api";
import { MessageContext } from "../../contexts/MessageContextProvider";
import {UserContext} from "../../contexts/UserContextProvider";
import {ScenarioDetailsContent, ScenarioDetailsResponse} from "../../types/ScenarioTypes";

const ScenarioBoxSkeleton = styled((props) => <Skeleton
    variant={"rectangular"}
    width={"20rem"}
    height={"5rem"}
    {...props}
  />
)({
  margin: "1rem 0"
});

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: 2,
});

const ScenarioContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "fit-content",
  margin: "2rem auto",
});

const RemoteUrl = "https://github.com/P4P-Group129-2022/";

function ScenarioSelectPage() {
  const [scenarioList, setScenarioList] = React.useState<ScenarioDetailsContent[]>([]);
  const { isLoading, data } = useGet<ScenarioDetailsResponse>("http://localhost:8080/api/scenario");
  const navigate = useNavigate();
  const { setScenario } = useContext(ScenarioContext);
  const { clearMessage } = useContext(MessageContext);
  const { user: { username } } = useContext(UserContext);

  React.useEffect(() => {
    if (data) {
      setScenarioList(data.scenarioDetailsFromDB);
      console.log(scenarioList);
    } else {
      console.log("Failed to fetch the scenario details from the DB.");
    }
  }, [data]);

  const handleSelectScenario = async (nameId: string) => {
    // Clear any existing messages.
    clearMessage();

    // Get scenario from server and set it in context.
    const retrievedScenario = await getScenarioByNameId(nameId);
    console.log("retrievedScenario", retrievedScenario);
    setScenario(retrievedScenario.data.scenarioFromDB.segments);

    await initRepoForScenario(username, nameId);
    await addRemote(username, RemoteUrl + username + ".git");

    navigate(`/scenario/slack`);
  };

  return (
    <MainContainer>
      <Typography variant={"h2"}>Select a scenario to play</Typography>
      <ScenarioContainer>
        {isLoading ? (
          <>
            <ScenarioBoxSkeleton />
            <ScenarioBoxSkeleton />
            <ScenarioBoxSkeleton />
          </>
        ) : (
          scenarioList.map((scenario, index) => (
            <Card
              key={`scenario_${index}`}
              sx={{
                margin: "1rem 0",
              }}
            >
              <CardActionArea
                onClick={async () => {
                  await handleSelectScenario(scenario.nameId);
                  console.log("onclick event finished");
                }}
              >
                <CardContent>
                  <Typography variant={"h4"}>
                    {scenario.name}
                  </Typography>
                  <Typography variant={"body1"} sx={{ whiteSpace: "pre-line" }}>
                    {scenario.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )))}
      </ScenarioContainer>
      <Button
        variant={"contained"}
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Main
      </Button>
    </MainContainer>
  );
}

export default ScenarioSelectPage;