import React, { useContext } from "react";
import { Box, Button, Card, CardActionArea, CardContent, Skeleton, Typography } from "@mui/material";
import useGet from "../../hooks/useGet";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import { ScenarioContent, ScenarioSegment } from "../../types/ScenarioTypes";
import axios from "axios";
import { getScenarioByNameId } from "../../api/Api";

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

function ScenarioSelectPage() {
  const [scenarioList, setScenarioList] = React.useState<{ name: string, nameId: string }[]>([]);
  const { isLoading, data } = useGet<{ name: string, nameId: string }[]>("http://localhost:8080/api/scenario");
  const navigate = useNavigate();
  const { setScenario } = useContext(ScenarioContext);

  React.useEffect(() => {
    // setScenarioList(data ?? []);
    setScenarioList([
      {
        name: "scenario-1",
        nameId: "scenario-1"
      },
      {
        name: "Scenario 2",
        nameId: "scenario-2"
      }
    ]);
  }, [data]);

  const handleSelectScenario = async (nameId: string) => {
    // TODO: Get scenario from server and set it in context.
    const retrievedScenario = await getScenarioByNameId(nameId);
    console.log("retrievedScenario", retrievedScenario);
    setScenario(retrievedScenario.data.scenarioFromDB.segments);
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
                  <Typography variant={"h3"}>{scenario.name}</Typography>
                  <Typography variant={"h5"}>{scenario.nameId}</Typography>
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