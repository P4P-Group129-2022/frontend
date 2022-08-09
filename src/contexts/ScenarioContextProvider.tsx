import {createContext, useContext, useEffect, useState} from "react";
import {ScenarioSegment} from "../types/ScenarioTypes";
import {MessageContext} from "./MessageContextProvider";
import {NotificationContext} from "./NotificationContextProvider";
import {checkPR, incrementCurrentScenario} from "../api/Api";
import {TaskType} from "../utils/TaskType";
import {UserContext} from "./UserContextProvider";

type ScenarioContextType = {
    currentSegment?: ScenarioSegment;
    setScenario: (scenario: ScenarioSegment[]) => void;
    checkAndAdvanceScenario: (taskType: TaskType) => boolean;
    checkIfPRIsCorrectlyMade: (pullNumber: string) => void;
};

const dummyScenarioSegment: ScenarioSegment = {
    chats: [],
    notifications: [],
    taskType: "",
};

const ScenarioContext = createContext<ScenarioContextType>({
    currentSegment: dummyScenarioSegment,
    setScenario: () => {
    },
    checkAndAdvanceScenario: () => false,
    checkIfPRIsCorrectlyMade: () => {
    },
});

type Props = {
    children: JSX.Element;
};

function ScenarioContextProvider({children}: Props) {
    const [scenario, setScenario] = useState<ScenarioSegment[]>();
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
    const {user: {username}} = useContext(UserContext);

    const {addMessages} = useContext(MessageContext);
    const {showNotification} = useContext(NotificationContext);

    useEffect(() => {
        console.log("scenario changed:", scenario);
        checkAndAdvanceScenarioSegment(TaskType.INITIAL);
    }, [scenario]);

    // For now, just use scenario 1.
    // const scenarios: ScenarioSegment[] = scenario1.map((segment) => ({
    //   ...segment,
    //   chats: segment.chats.map((chat) => ({ ...chat, timestamp: new Date(chat.timestamp) }))
    // }));

    async function checkIfPRIsCorrectlyMade(pullNumber: string) {
        const isPRCorrectlyMade = await checkPR(pullNumber, username);
        if (isPRCorrectlyMade.data.isPRmade) {
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
        } else if (scenario[currentSegmentIndex].taskType === taskType) {
            shouldAdvance = true;
        }

        if (scenario[currentSegmentIndex].taskType === TaskType.FINAL) {
            incrementCurrentScenario(username).then(r => r);
        }

        if (shouldAdvance) {
            // TODO: Process each chats into messages screen.
            console.log("chats to add", nextScenarioSegment.chats);
            addMessages(nextScenarioSegment.chats.map((chat) => ({...chat, timestamp: new Date()})).reverse());

            nextScenarioSegment.notifications.forEach(({message, title, imageSrc}) => {
                showNotification({message, title, imageSrc});
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
        checkIfPRIsCorrectlyMade,
    };

    return (
        <ScenarioContext.Provider value={context}>
            {children}
        </ScenarioContext.Provider>
    );
}

export {ScenarioContext, ScenarioContextProvider};