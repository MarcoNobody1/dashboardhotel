import { useEffect, createContext, useReducer } from "react";

const toggle_key = "isToggle";

export const ToggleContext = createContext({});

const initialState = () => {
  if (localStorage.getItem(toggle_key)) {
    return JSON.parse(localStorage.getItem(toggle_key));
  } else {
    return { toggle: false };
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return {
        toggle: !state.toggle,
      };
    default:
      return state;
  }
};

export const ToggleContainer = ({ children }) => {
  const [toggle, toggleDispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    localStorage.setItem(toggle_key, JSON.stringify(toggle));
  }, [toggle]);

  return (
    <ToggleContext.Provider value={{ toggle, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};
