import { useEffect, createContext, useReducer, ReactNode, FC } from "react";

const toggle_key:string = "isToggle";

interface InitialStateInterface {
  toggle: boolean,
}

interface ToggleInterface {
  type: "toggle";
  payload?: {
    toggle: boolean;
  };
}

interface ToggleContextInterface {
  toggle: InitialStateInterface;
  toggleDispatch: React.Dispatch<ToggleInterface>;
}

interface ToggleContainerInterface {
  children: ReactNode
}

export const ToggleContext = createContext<ToggleContextInterface>({
  toggle: {
    toggle: false,
  },
  toggleDispatch: () => { },
});

const initialState = (): InitialStateInterface => {
  if (localStorage.getItem(toggle_key)) {
    return JSON.parse(localStorage.getItem(toggle_key) || "");
  } else {
    return { toggle: false };
  }
};

const reducer = (state:InitialStateInterface, action:ToggleInterface) => {
  switch (action.type) {
    case "toggle":
      return {
        toggle: !state.toggle,
      };
    default:
      return state;
  }
};

export const ToggleContainer: FC<ToggleContainerInterface> = ({ children }) => {
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
