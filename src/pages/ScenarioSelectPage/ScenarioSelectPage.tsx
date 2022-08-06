import React, { useContext } from "react";
import { Box, Button, Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import useGet from "../../hooks/useGet";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import {addRemote, getScenarioByNameId, initRepoForScenario} from "../../api/Api";
import { MessageContext } from "../../contexts/MessageContextProvider";
import {UserContext} from "../../contexts/UserContextProvider";

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

type Scenarios = { name: string, nameId: string, description: string }[]

function ScenarioSelectPage() {
  const [scenarioList, setScenarioList] = React.useState<Scenarios>([]);
  const { isLoading, data } = useGet<Scenarios>("http://localhost:8080/api/scenario");
  const navigate = useNavigate();
  const { setScenario } = useContext(ScenarioContext);
  const { clearMessage } = useContext(MessageContext);
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    // setScenarioList(data ?? []);
    setScenarioList([
      {
        name: "Scenario 1 - The Beginning",
        nameId: "scenario-1",
        description: `
        You are starting as a new software developer intern at LGI Inc. 
        You are given a task to complete and various git commands to complete alongside it.
        
        Git commands taught: git status, add, commit, push`
      },
      {
        name: "Scenario 2 - Interruptions",
        nameId: "test",
        description: `
        Developing in a team often means your teammate has pushed a change while you were working on your branch.
        You need to handle this interruptions and make sure you merge to the main branch without any problem.
        
        Git commands taught: git checkout, branch, rebase
        `
      }
    ]);
  }, [data]);

  const handleSelectScenario = async (nameId: string) => {
    // Clear any existing messages.
    clearMessage();

    // Get scenario from server and set it in context.
    const retrievedScenario = await getScenarioByNameId(nameId);
    console.log("retrievedScenario", retrievedScenario);
    setScenario(retrievedScenario.data.scenarioFromDB.segments);

    if (user) {
      await initRepoForScenario(user.username, nameId);
      await addRemote(user.username, RemoteUrl + user.username + ".git");
    }

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