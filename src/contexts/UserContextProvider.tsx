import { createContext } from "react";
import { User } from "../types/UserTypes";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { useAccessTokenState, useUserState } from "../hooks/usePersistedState";
import {completePreTest as completePreTestInAPI, incrementCurrentScenario as incrementCurrentScenarioInAPI} from "../api/Api";

type UserContextType = {
  user: User,
  accessToken: string | undefined,
  loggedIn: boolean,
  completePreTest: () => Promise<void>,
  incrementCurrentScenario: () => Promise<void>,
  loginToContext: (user: GitHubUser, email: string, accessToken: string, completedPreTest: boolean,
                   currentScenario: number) => void,
  logoutFromContext: () => void,
}

type Props = {
  children: JSX.Element;
}

type GitHubUser = RestEndpointMethodTypes["users"]["getAuthenticated"]["response"]["data"];

const EMPTY_USER: User = {
  email: "",
  name: "",
  username: "",
  avatarUrl: "",
  completedPreTest: false,
  currentScenario: 0,
};

const UserContext = createContext<UserContextType>({
  user: EMPTY_USER,
  accessToken: "",
  loggedIn: false,
  completePreTest: async () => {},
  loginToContext: () => {},
  logoutFromContext: () => {},
  incrementCurrentScenario: async () => {},
});

function UserContextProvider({ children }: Props) {
  const [user, setUser] = useUserState(EMPTY_USER);
  const [accessToken, setAccessToken] = useAccessTokenState();

  const extractUserInformation = ({
    login,
    name,
    avatar_url
  }: GitHubUser, email: string, completedPreTest: boolean, currentScenario: number): User =>
    ({
      email: email ?? "",
      name: name ?? login,
      username: login,
      avatarUrl: avatar_url,
      completedPreTest,
      currentScenario
    });

  const completePreTest = async () => {
    setUser({ ...user, completedPreTest: true });
    await completePreTestInAPI(user.username);
  };

  const loginToContext = (user: GitHubUser, email: string, accessToken: string, completedPreTest: boolean,
                          currentScenario: number) => {
    setAccessToken(accessToken);
    setUser(extractUserInformation(user, email, completedPreTest, currentScenario));
  };

  const logoutFromContext = () => {
    setUser(EMPTY_USER);
    setAccessToken("");
  };

  const incrementCurrentScenario = async () => {
    setUser({ ...user, currentScenario: user.currentScenario + 1 });
    await incrementCurrentScenarioInAPI(user.username);
  }

  const context: UserContextType = {
    user,
    accessToken,
    loggedIn: user.username !== "" && !!accessToken,
    completePreTest,
    loginToContext,
    logoutFromContext,
    incrementCurrentScenario,
  };

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };