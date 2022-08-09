// noinspection ExceptionCaughtLocallyJS

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useContext, useState } from "react";
import { Octokit } from "@octokit/rest";
import { UserContext } from "../contexts/UserContextProvider";
import { createUser, inviteToOrganization } from "../api/Api";

export const useLogin = () => {
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const { loginToContext, completePreTest } = useContext(UserContext);
  const provider = new GithubAuthProvider();

  const login = async () => {
    setError(undefined);
    setIsPending(true);

    try {
      provider.addScope("repo");
      provider.addScope("user");
      provider.addScope("admin:org");

      const res = await signInWithPopup(auth, provider);
      if (!res) throw new Error("Could not complete signup");

      const credentials = GithubAuthProvider.credentialFromResult(res);
      if (!credentials) throw new Error("Could not retrieve github credentials from sign in result");

      const token = credentials.accessToken;
      if (!token) throw new Error("Could not retrieve github token from credentials");

      const { email } = res.user;
      console.log("credentials", credentials);
      console.log("token", token);

      const octokit = new Octokit({ auth: token });
      const { data: user } = await octokit.rest.users.getAuthenticated();
      console.log("result from octokit", user);

      const { data: { userFromDB: dbUser } } = await createUser(user.login || "", email ?? "", user.name ?? user.login);
      console.log("dbUser", dbUser);

      loginToContext(user, email ?? "", token, dbUser.completedPreTest, dbUser.currentScenario);
      await inviteToOrganization(user.login || "");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};