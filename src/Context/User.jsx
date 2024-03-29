import { createContext, useEffect } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  /*const [userName,setUser]=useState('jasmin');*/
  const [UserToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [AuthName, setAuthName] = useState(null);
  const getUserInfo = () => {
    if (UserToken != null) {
      const decoded = jwtDecode(UserToken);
      console.log(decoded);
      setAuthName(decoded.userName);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [UserToken]);

  return (
    <UserContext.Provider value={{ setUserToken, AuthName, setAuthName }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
