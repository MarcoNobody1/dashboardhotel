import { useEffect, createContext, useReducer } from "react";

const auth_key = "auth_info";

export const AuthContext = createContext({});

const initialState = () => {
  if (localStorage.getItem(auth_key)) {
    return JSON.parse(localStorage.getItem(auth_key));
  } else {
    return { authenticated: false, username: null, email: null };
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        authenticated: true,
        username: action.payload.username,
        email: action.payload.email,
      };
    case "logout":
      return { authenticated: false, username: null, email: null };

    case "update":
      return {
        authenticated: true,
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
      };
    default:
      return state;
  }
};

export const AuthContainer = ({ children }) => {
  const [auth, authDispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    localStorage.setItem(auth_key, JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
