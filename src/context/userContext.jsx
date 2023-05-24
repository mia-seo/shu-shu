import { createContext, useContext, useEffect, useState } from "react";
import { onAuthState, signin, signout } from "../api/googleAuth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthState(setUser);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signin,
        signout,
        uid: user && user.uid,
        isAdmin: user && user.isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
