import { createContext, FC, useContext, useEffect, useState } from "react";
import { ScenarioSegment } from "../types/ScenarioTypes";
import scenario1 from "../scenarios/scenario1/scenario1.json";
import { MessageContext } from "./MessageContextProvider";
import { NotificationContext } from "./NotificationContextProvider";
import { TaskType } from "../utils/TaskType";
import { getScenarioByNameId } from "../api/Api";

type ScenarioContextType = {
  currentSegment?: ScenarioSegment;
  setScenario: (scenario: ScenarioSegment[]) => void;
  checkAndAdvanceScenario: (taskType: TaskType) => boolean;
};

const dummyScenarioSegment: ScenarioSegment = {
  chats: [],
  notifications: [],
  endRepoID: "",
};

const ScenarioContext = createContext<ScenarioContextType>({
  currentSegment: dummyScenarioSegment,
  setScenario: () => {},
  checkAndAdvanceScenario: () => false,
});

type Props = {
  children: JSX.Element;
};

function ScenarioContextProvider({ children }: Props) {
  const [scenario, setScenario] = useState<ScenarioSegment[]>();
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState(-1);

  const { addMessage } = useContext(MessageContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    console.log("scenario changed:", scenario);
    checkAndAdvanceScenario(TaskType.INITIAL);
  }, [scenario]);

  // For now, just use scenario 1.
  // const scenarios: ScenarioSegment[] = scenario1.map((segment) => ({
  //   ...segment,
  //   chats: segment.chats.map((chat) => ({ ...chat, timestamp: new Date(chat.timestamp) }))
  // }));

  function checkAndAdvanceScenario(taskType: TaskType): boolean {
    if (!scenario) return false;

    const nextScenarioIndex = currentFragmentIndex + 1;

    const nextScenarioSegment = scenario[nextScenarioIndex];

    let shouldAdvance = false;
    if (taskType === scenario[currentFragmentIndex].endRepoID) {
      const shouldAdvance = true;
    }

    if (shouldAdvance) {
      // TODO: Process each chats into messages screen.
      nextScenarioSegment.chats.forEach((chatDialog) => {
        console.log(
          "Message from: ",
          chatDialog.sender.name,
          " || ",
          chatDialog.content
        );
        addMessage(chatDialog);
      });

      nextScenarioSegment.notifications.forEach(({ message, title }) => {
        showNotification({ message, title });
      });

      setCurrentFragmentIndex(nextScenarioIndex);
    }

    return shouldAdvance;
  }

  const setScenarioContext = (scenario: ScenarioSegment[]) => {
    setCurrentFragmentIndex(-1);
    setScenario(scenario);
  };

  const context: ScenarioContextType = {
    currentSegment: scenario?.[currentFragmentIndex],
    setScenario: setScenarioContext,
    checkAndAdvanceScenario,
  };

  return (
    <ScenarioContext.Provider value={context}>
      {children}
    </ScenarioContext.Provider>
  );
}

export { ScenarioContext, ScenarioContextProvider };
