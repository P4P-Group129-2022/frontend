import { createContext } from "react";
import { User } from "../types/UserTypes";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { useAccessTokenState, useUserState } from "../hooks/usePersistedState";

type UserContextType = {
  user: User | undefined,
  accessToken: string | undefined,
  loginToContext: (user: GitHubUser, email: string, accessToken: string) => void,
  logoutFromContext: () => void,
}

type Props = {
  children: JSX.Element;
}

type GitHubUser = RestEndpointMethodTypes["users"]["getAuthenticated"]["response"]["data"];

const UserContext = createContext<UserContextType>({
  user: { email: "", name: "", username: "" },
  accessToken: "",
  loginToContext: () => {},
  logoutFromContext: () => {},
});

const EMPTY_USER: User = { email: "", name: "", username: "" };

function UserContextProvider({ children }: Props) {
  const [user, setUser] = useUserState(EMPTY_USER);
  const [accessToken, setAccessToken] = useAccessTokenState();

  const extractUserInformation = ({ login, name, }: GitHubUser, email: string): User =>
    ({ email: email ?? "", name: name ?? login, username: login });

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