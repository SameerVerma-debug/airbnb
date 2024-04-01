import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [userFetched,setUserFetched] = useState(false);
  return (
    <UserContext.Provider value={{user,setUser,userFetched,setUserFetched}}>
      {children}
    </UserContext.Provider>
  )
}