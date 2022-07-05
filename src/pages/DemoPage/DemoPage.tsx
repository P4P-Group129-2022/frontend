import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import useGet from "../../hooks/useGet";
import { Button } from "@mui/material";
import useNotifications from "../../hooks/useNotifications";
import AppWindowFrame from "../../components/AppWindowFrame";

function DemoPage() {
  const [greeting, setGreeting] = useState<string | undefined>(undefined);
  const { data, isLoading } = useGet<string>("http://localhost:8080/api/git");
  const [initRepoResult, setInitRepoResult] = useState<any>(undefined);

  const { currentScenario, checkAndAdvanceScenario } =
    useContext(ScenarioContext);

  useEffect(() => {
    data && setGreeting(JSON.stringify(data));
  }, [data]);

  const handleInitRepo = async () => {
    const res = await axios.post("http://localhost:8080/api/git/init");
    setInitRepoResult(`Status: ${res.status} || Data: ${res.data.message}`);
  };

  const handleGetLog = async () => {
    const res = await axios.get<{ log: object }>(
      "http://localhost:8080/api/git/logs"
    );
    console.log(res.data.log);
    setInitRepoResult(
      `Status: ${res.status} || Data: ${JSON.stringify(res.data.log)}`
    );
  };

  const { showNotification } = useNotifications();

  return (
    <AppWindowFrame frameColor={"#270C29"} title={"Demo Page"} >
      <h1>HomePage</h1>
      <h3>{greeting ?? "greeting"}</h3>
      <button onClick={handleInitRepo} style={{ margin: 10 }}>
        Init repo
      </button>
      <button onClick={handleGetLog} style={{ margin: 10 }}>
        Get commit history
      </button>
      <h3>{initRepoResult ?? "wow"}</h3>

      <hr />
      <h3>Current Chats</h3>
      {currentScenario.chats.map((chat, index) => (
        <h5 key={`chat_${index}`}>
          "{chat.message}" by {chat.senderId}
        </h5>
      ))}

      <button
        onClick={() => {
          checkAndAdvanceScenario();
        }}
      >
        fulfil scenario completion
      </button>

      <Button variant="outlined" onClick={() => {
        showNotification({
          title: "Hello",
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "In ex erat, laoreet nec mi a, placerat mattis diam. Proin venenatis sagittis est, " +
            "a mattis tellus auctor sed.",
          imageSrc: "icons/terminal.png"
        });
      }}>
        launch notification.
      </Button>
    </AppWindowFrame>
  );
}

export default DemoPage;
