import { createContext, useContext, useEffect, useState } from "react";
import { ScenarioSegment } from "../types/ScenarioTypes";
import { MessageContext } from "./MessageContextProvider";
import { NotificationContext } from "./NotificationContextProvider";
import { checkPR } from "../api/Api";
import { TaskType } from "../utils/TaskType";
import { UserContext } from "./UserContextProvider";
import { ChatDialog } from "../types/ChatTypes";

type ScenarioContextType = {
  currentSegment?: ScenarioSegment;
  setScenario: (scenario: ScenarioSegment[]) => void;
  checkAndAdvanceScenarioSegment: (taskType: TaskType) => boolean;
  checkIfPRIsCorrectlyMade: (pullNumber: string) => void;
};

const dummyScenarioSegment: ScenarioSegment = {
  chats: [],
  notifications: [],
  taskType: "",
};

const ScenarioContext = createContext<ScenarioContextType>({
  currentSegment: dummyScenarioSegment,
  setScenario: () => {},
  checkAndAdvanceScenarioSegment: () => false,
  checkIfPRIsCorrectlyMade: () => {},
});

type Props = {
  children: JSX.Element;
};

function ScenarioContextProvider({ children }: Props) {
  const [scenario, setScenario] = useState<ScenarioSegment[]>();
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
  const { user: { username } } = useContext(UserContext);

  const { addMessages } = useContext(MessageContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    console.log("scenario changed:", scenario);
    checkAndAdvanceScenarioSegment(TaskType.INITIAL);
  }, [scenario]);

  async function checkIfPRIsCorrectlyMade(pullNumber: string) {
    const isPRCorrectlyMade = await checkPR(pullNumber, username);
    if (isPRCorrectlyMade.data.isPRmade) {
      checkAndAdvanceScenarioSegment(TaskType.PR);
    }
  }

  function checkAndAdvanceScenarioSegment(taskType: TaskType): boolean {
    if (!scenario) return false;

    let numSegmentAdvance = 0;
    if (taskType === TaskType.INITIAL) {
      numSegmentAdvance = 1;
    } else if (scenario[currentSegmentIndex].taskType === TaskType.ADD && taskType === TaskType.ADDCOMMIT) {
      numSegmentAdvance = 2;
    } else if (scenario[currentSegmentIndex].taskType === taskType) {
      numSegmentAdvance = 1;
    }

    if (numSegmentAdvance > 0) {
      let nextSegmentIndex = currentSegmentIndex + numSegmentAdvance;
      const nextScenarioSegment = scenario[nextSegmentIndex];

      for (let i = 0; i < numSegmentAdvance; i++) {
        console.log("chats to add", nextScenarioSegment.chats);
        const newMessages = nextScenarioSegment.chats.map((chat) => ({ ...chat, timestamp: new Date() })).reverse();
        const notification = nextScenarioSegment.notifications?.[0];
        const notificationMessage: ChatDialog[] = !!notification ? [{
          sender: { name: "[NOTIFICATION]", nameId: "[NOTIFICATION]", profileImgUrl: "" },
          content: `${notification?.title} — ${notification?.message}`,
          timestamp: new Date()
        }] : [];
        addMessages([...notificationMessage, ...newMessages]);

        nextScenarioSegment.notifications.forEach(({ message, title, imageSrc }) => {
          showNotification({ message, title, imageSrc });
        });
      }

      setCurrentSegmentIndex(() => nextSegmentIndex);
    }

    return numSegmentAdvance > 0;
  }

  const setScenarioContext = (scenario: ScenarioSegment[]) => {
    setCurrentSegmentIndex(-1);
    setScenario(scenario);
  };

  const context: ScenarioContextType = {
    currentSegment: scenario?.[currentSegmentIndex],
    setScenario: setScenarioContext,
    checkAndAdvanceScenarioSegment,
    checkIfPRIsCorrectlyMade,
  };

  return (
    <ScenarioContext.Provider value={context}>
      {children}
    </ScenarioContext.Provider>
  );
}

export { ScenarioContext, ScenarioContextProvider };