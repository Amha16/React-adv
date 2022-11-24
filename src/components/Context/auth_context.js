import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    const logg = localStorage.getItem("loginstatus");
    if (logg === "1") {
      setIsLoggedIn(true);
    }
  }, []);



  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("loginstatus");
  };
  const loginHandler = () => {
    localStorage.setItem("loginstatus", "1");
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
