import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

export const useLogout = () => {
  const { logoutFromContext } = useContext(UserContext);

  const logout = async () => {
    try {
      await signOut(auth);
      logoutFromContext();
      console.log("User logged out");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { logout };
};