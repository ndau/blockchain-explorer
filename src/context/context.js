import { createContext, useState } from "react";

export const UserContext = createContext({
  loggedIn: false,
  updateLoggedIn: () => {},
});

const UserContextProvider = (props) => {
  const [loggedInState, setLoggedInState] = useState(false);

  let loggedInContextValue = {
    loggedIn: loggedInState,
    updateLoggedIn: setLoggedInState,
  };
  
  return (
    <UserContext.Provider value={loggedInContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
