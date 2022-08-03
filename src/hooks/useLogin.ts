// noinspection ExceptionCaughtLocallyJS

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import { useContext, useState } from "react";
import { Octokit } from "@octokit/rest";
import { UserContext } from "../contexts/UserContextProvider";

export const useLogin = () => {
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const { loginToContext } = useContext(UserContext);
  const provider = new GithubAuthProvider();

  const login = async () => {
    setError(undefined);
    setIsPending(true);

    try {
      provider.addScope("repo");
      provider.addScope("user");
      provider.addScope("admin:org");
      // provider.addScope("admin:public_key");
      // provider.addScope("admin:repo_hook");

      const res = await signInWithPopup(auth, provider);
      if (!res) throw new Error("Could not complete signup");

      const credentials = GithubAuthProvider.credentialFromResult(res);
      if (!credentials) throw new Error("Could not retrieve github credentials from sign in result");

      const token = credentials.accessToken;
      if (!token) throw new Error("Could not retrieve github token from credentials");

      const { email } = res.user;
      console.log("credentials", credentials);
      console.log("token", token);
      // console.log("user", user);

      const octokit = new Octokit({ auth: token });
      const { data: user } = await octokit.rest.users.getAuthenticated();
      console.log("result from octokit", user);

      loginToContext(user, email ?? "", token);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};