import { createContext, useState, useEffect } from "react";
import { getAllUsers } from "../service/userService";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <>
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    </>
  );
}

export { UserProvider, UserContext };
