import { createContext, FC, useContext, useState } from "react";
import { ScenarioSegment } from "../types/ScenarioTypes";
import scenario1 from "../scenarios/scenario1/scenario1.json";
import { MessageContext } from "./MessageContextProvider";
import { NotificationContext } from "./NotificationContextProvider";

type ScenarioContextType = {
  currentScenario: ScenarioSegment;
  checkAndAdvanceScenario: () => boolean;
};

const dummyScenarioSegment: ScenarioSegment = {
  chats: [],
  endRepoID: "",
};

const ScenarioContext = createContext<ScenarioContextType>({
  currentScenario: dummyScenarioSegment,
  checkAndAdvanceScenario: () => false,
});

type Props = {
  children: JSX.Element;
};

function ScenarioContextProvider({ children }: Props) {
  // For now, just use scenario 1.
  const scenario: ScenarioSegment[] = scenario1;

  const [scenarios, setScenarios] = useState<ScenarioSegment[]>(scenario);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  // let currentScenarioSegment = scenarios[currentScenarioIndex];

  const { addMessage } = useContext(MessageContext);
  const { showNotification } = useContext(NotificationContext);

  function checkAndAdvanceScenario(): boolean {
    const nextScenarioIndex = currentScenarioIndex + 1;

    const nextScenarioSegment = scenarios[nextScenarioIndex];

    // TODO: Check whether we should advance to the new scenario segment.
    const shouldAdvance = true;

    if (shouldAdvance) {
      // TODO: Process each chats into messages screen.
      nextScenarioSegment.chats.forEach((chatDialog) => {
        console.log(
          "Message from: ",
          chatDialog.sender,
          " || ",
          chatDialog.message
        );
        addMessage(chatDialog);
        showNotification({ message: chatDialog.message, title: `Message from: ${chatDialog.sender}` });
      });

      setCurrentScenarioIndex(nextScenarioIndex);
    }

    return shouldAdvance;
  }

  const context: ScenarioContextType = {
    currentScenario: scenarios[currentScenarioIndex],
    checkAndAdvanceScenario,
  };

  return (
    <ScenarioContext.Provider value={context}>
      {children}
    </ScenarioContext.Provider>
  );
}

export { ScenarioContext, ScenarioContextProvider };
