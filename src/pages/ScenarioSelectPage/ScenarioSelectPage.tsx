import { useContext, useEffect, useState } from "react";
import { Box, Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import Button from "../../components/Button";
import useGet from "../../hooks/useGet";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import {
  addRemote,
  getScenarioByNameId,
  initRepoForScenario,
  API_ENDPOINT
} from "../../api/Api";
import { MessageContext } from "../../contexts/MessageContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import { ScenarioDetailsContent, ScenarioDetailsResponse } from "../../types/ScenarioTypes";

const ScenarioBoxSkeleton = styled(
  (props) => <Skeleton
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
  justifyContent: "flex-start",
  padding: 2,
  height: "100%",
  overflowY: "scroll",
});

const ScenarioContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "60vw",
});

const RemoteUrl = "https://github.com/P4P-Group129-2022/";

function ScenarioSelectPage() {
  const [scenarioList, setScenarioList] = useState<ScenarioDetailsContent[]>([]);
  const { isLoading, data } = useGet<ScenarioDetailsResponse>(`${API_ENDPOINT}/api/scenario`);
  const navigate = useNavigate();
  const { setScenario } = useContext(ScenarioContext);
  const { clearMessage } = useContext(MessageContext);
  const { user: { username } } = useContext(UserContext);

  useEffect(() => {
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
      <Typography sx={{
        fontSize: "2.5rem",
        fontWeight: "600",
        marginTop: "6vh",
        marginBottom: "2rem",
      }}>Select a scenario to play</Typography>
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
                width: "100%",
                margin: "1rem 0",
                border: "1px solid #00000050",
              }}
            >
              <CardActionArea
                onClick={async () => {
                  await handleSelectScenario(scenario.nameId);
                  console.log("onclick event finished");
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.75rem",
                      fontWeight: "500",
                      marginBottom: "0.25rem",
                    }}
                  >
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
        color={"secondary"}
        onClick={() => {
          navigate("/");
        }}
        sx={{
          margin: "2rem 0",
        }}
      >
        Back to Main
      </Button>
    </MainContainer>
  );
}

export default ScenarioSelectPage;