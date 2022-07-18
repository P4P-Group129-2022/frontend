import { createContext, FC, useContext, useEffect, useState } from "react";
import { ScenarioSegment } from "../types/ScenarioTypes";
import scenario1 from "../scenarios/scenario1/scenario1.json";
import { MessageContext } from "./MessageContextProvider";
import { NotificationContext } from "./NotificationContextProvider";

type ScenarioContextType = {
  currentScenario?: ScenarioSegment;
  setScenario: (scenario: ScenarioSegment[]) => void;
  checkAndAdvanceScenario: () => boolean;
};

const dummyScenarioSegment: ScenarioSegment = {
  chats: [],
  notifications: [],
  endRepoID: "",
};

const ScenarioContext = createContext<ScenarioContextType>({
  currentScenario: dummyScenarioSegment,
  setScenario: () => {},
  checkAndAdvanceScenario: () => false,
});

type Props = {
  children: JSX.Element;
};

function ScenarioContextProvider({ children }: Props) {
  const [scenario, setScenario] = useState<ScenarioSegment[]>();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(-1);

  const { addMessage } = useContext(MessageContext);
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    console.log("scenario changed:", scenario);
    checkAndAdvanceScenario();
  }, [scenario]);

  // For now, just use scenario 1.
  // const scenarios: ScenarioSegment[] = scenario1.map((segment) => ({
  //   ...segment,
  //   chats: segment.chats.map((chat) => ({ ...chat, timestamp: new Date(chat.timestamp) }))
  // }));

  function checkAndAdvanceScenario(): boolean {
    console.log("scenario", scenario);
    if (!scenario) return false;

    const nextScenarioIndex = currentScenarioIndex + 1;

    const nextScenarioSegment = scenario[nextScenarioIndex];

    // TODO: Check whether we should advance to the new scenario segment.
    const shouldAdvance = true;

    if (shouldAdvance) {
      // TODO: Process each chats into messages screen.
      nextScenarioSegment.chats.forEach((chatDialog) => {
        console.log(
          "Message from: ",
          chatDialog.sender,
          " || ",
          chatDialog.content
        );
        addMessage(chatDialog);
      });

      nextScenarioSegment.notifications.forEach(({ message, title }) => {
        showNotification({ message, title });
      });

      setCurrentScenarioIndex(nextScenarioIndex);
    }

    return shouldAdvance;
  }

  const setScenarioContext = (scenario: ScenarioSegment[]) => {
    setCurrentScenarioIndex(-1);
    setScenario(scenario);
  };

  const context: ScenarioContextType = {
    currentScenario: scenario?.[currentScenarioIndex],
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
