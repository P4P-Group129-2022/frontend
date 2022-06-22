import axios from "axios";
import React, { useContext } from "react";
import { ScenarioContext } from "../../contexts/ScenarioContextProvider";
import useGet from "../../hooks/useGet";

function DemoPage() {
  const [greeting, setGreeting] = React.useState<string | undefined>(undefined);
  const { data, isLoading } = useGet<string>("http://localhost:8080/api/git");
  const [initRepoResult, setInitRepoResult] = React.useState<any>(undefined);

  const { currentScenario, checkAndAdvanceScenario } =
    useContext(ScenarioContext);

  React.useEffect(() => {
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

  return (
    <div>
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
      {currentScenario.chats.map((chat) => (
        <h5>
          "{chat.message}" by {chat.sender}
        </h5>
      ))}

      <button
        onClick={() => {
          checkAndAdvanceScenario();
        }}
      >
        fulfil scenario completion
      </button>
    </div>
  );
}

export default DemoPage;
