import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Basically is like creating a global context or useState that can be used
// by all other components
export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        const { data } = await axios.get("/account");
        setUser(data);
        setReady(true);
      }
    }

    fetchData();
  }, []);

  return (
    // Heres how other component can use is create a state and pass it in the value as object
    // then wrap all the components you want to be able to access these state using the "NameOfContext.Provider" 
    // now check App.jsx, you'll see that we wrap all the routes with this, and all those routes will be able to access these 3 state values that was passed in
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
