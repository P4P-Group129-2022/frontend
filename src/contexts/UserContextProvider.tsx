import { createContext } from "react";
import { User } from "../types/UserTypes";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { useAccessTokenState, useUserState } from "../hooks/usePersistedState";

type UserContextType = {
  user: User,
  accessToken: string | undefined,
  loggedIn: boolean,
  completePreTest: () => void,
  loginToContext: (user: GitHubUser, email: string, accessToken: string) => void,
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
};

const UserContext = createContext<UserContextType>({
  user: EMPTY_USER,
  accessToken: "",
  loggedIn: false,
  completePreTest: () => {},
  loginToContext: () => {},
  logoutFromContext: () => {},
});

function UserContextProvider({ children }: Props) {
  const [user, setUser] = useUserState(EMPTY_USER);
  const [accessToken, setAccessToken] = useAccessTokenState();

  const extractUserInformation = ({ login, name, avatar_url }: GitHubUser, email: string): User =>
    ({
      email: email ?? "",
      name: name ?? login,
      username: login,
      avatarUrl: avatar_url,
      completedPreTest: false
    });

  const completePreTest = () => {
    setUser({ ...user, completedPreTest: true });
    // send api call here.
  };

  const loginToContext = (user: GitHubUser, email: string, accessToken: string) => {
    setAccessToken(accessToken);
    setUser(extractUserInformation(user, email));
  };

  const logoutFromContext = () => {
    setUser(EMPTY_USER);
    setAccessToken("");
  };

  const context: UserContextType = {
    user,
    accessToken,
    loggedIn: user.username !== "" && !!accessToken,
    completePreTest,
    loginToContext,
    logoutFromContext,
  };

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };