import { createContext, FC, useState } from "react";
import { ScenarioSegment } from "../types/ScenarioTypes";
import scenario1 from "../scenarios/scenario1/scenario1.json";

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

  function checkAndAdvanceScenario(): boolean {
    const nextScenarioIndex = currentScenarioIndex + 1;

    const nextScenarioSegment = scenarios[nextScenarioIndex];

    // TODO: Check whether we should advance to the new scenario segment.
    const shouldAdvance = true;

    if (shouldAdvance) {
      nextScenarioSegment.chats.forEach((chatDialog) => {
        console.log(
          "Message from: ",
          chatDialog.sender,
          " || ",
          chatDialog.message
        );
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
