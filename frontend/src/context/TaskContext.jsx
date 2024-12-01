import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

const taskContext = createContext();

function TaskContextProvider({ children }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  async function fetchSignup(data) {
    fetch();
  }

  async function fetchLogin(data) {}
  return (
    <taskContext.Provider
      value={{
        navigate,
        fetchSignup,
        fetchLogin,
      }}
    >
      {children}
    </taskContext.Provider>
  );
}

function useTaskContext() {
  const context = useContext(taskContext);

  if (!context)
    throw new Error("Called in parent component if needed please shift up");
  return context;
}

export { useTaskContext, TaskContextProvider };
