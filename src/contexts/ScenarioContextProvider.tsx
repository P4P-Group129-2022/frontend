import {createContext, useContext, useEffect, useState} from "react";
import {ScenarioSegment} from "../types/ScenarioTypes";
import {MessageContext} from "./MessageContextProvider";
import {NotificationContext} from "./NotificationContextProvider";
import {TaskType} from "../utils/TaskType";
import {checkPR} from "../api/Api";

type ScenarioContextType = {
  currentSegment?: ScenarioSegment;
  setScenario: (scenario: ScenarioSegment[]) => void;
  checkAndAdvanceScenario: (taskType: TaskType) => boolean;
  checkIfPRIsCorrectlyMade: (pullNumber: string) => void;
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
  checkIfPRIsCorrectlyMade: () => {},
});

type Props = {
  children: JSX.Element;
};

function ScenarioContextProvider({ children }: Props) {
  const [scenario, setScenario] = useState<ScenarioSegment[]>();
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);

  const { addMessage } = useContext(MessageContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    console.log("scenario changed:", scenario);
    //checkAndAdvanceScenarioSegment(TaskType.INITIAL);
    checkAndAdvanceScenarioSegment(TaskType.INITIAL);
  }, [scenario]);

  // For now, just use scenario 1.
  // const scenarios: ScenarioSegment[] = scenario1.map((segment) => ({
  //   ...segment,
  //   chats: segment.chats.map((chat) => ({ ...chat, timestamp: new Date(chat.timestamp) }))
  // }));

  async function checkIfPRIsCorrectlyMade(pullNumber: string) {
    const isPRCorrectlyMade = await checkPR(pullNumber);
    if (isPRCorrectlyMade.data.isPRCorrectlyMade) {
      checkAndAdvanceScenarioSegment(TaskType.PR);
    }
  }

  function checkAndAdvanceScenarioSegment(taskType: TaskType): boolean {
    if (!scenario) return false;

    const nextSegmentIndex = currentSegmentIndex + 1;

    const nextScenarioSegment = scenario[nextSegmentIndex];

    let shouldAdvance = false;
    if (taskType === TaskType.INITIAL) {
      shouldAdvance = true;
    } else if (scenario[currentSegmentIndex].endRepoID === taskType) {
      shouldAdvance = true;
    }
    // if (currentSegmentIndex === -1) {
    //   shouldAdvance = true;
    // } else if (taskType === scenario[currentSegmentIndex].endRepoID) {
    //   const shouldAdvance = true;
    // }

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

      setCurrentSegmentIndex(nextSegmentIndex);
    }

    return shouldAdvance;
  }

  const setScenarioContext = (scenario: ScenarioSegment[]) => {
    setCurrentSegmentIndex(-1);
    setScenario(scenario);
  };

  const context: ScenarioContextType = {
    currentSegment: scenario?.[currentSegmentIndex],
    setScenario: setScenarioContext,
    checkAndAdvanceScenario: checkAndAdvanceScenarioSegment,
    checkIfPRIsCorrectlyMade: checkIfPRIsCorrectlyMade,
  };

  return (
    <ScenarioContext.Provider value={context}>
      {children}
    </ScenarioContext.Provider>
  );
}

export { ScenarioContext, ScenarioContextProvider };