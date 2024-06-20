import { createContext, useState } from "react";

export const UserTokenContext = createContext();

export default function UserTokenProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  
  return (
    <UserTokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserTokenContext.Provider>
  );
}
