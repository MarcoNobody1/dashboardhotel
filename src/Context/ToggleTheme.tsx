import { useEffect, createContext, useReducer, ReactNode, FC, useContext } from "react";

const theme_key:string = "isDark";


interface InitialStateInterface {
  dark: boolean,
}

interface ThemeInterface {
  type: "dark";
  payload?: {
    dark: boolean;
  };
}

interface ThemeContextInterface {
  dark: InitialStateInterface;
  darkDispatch: React.Dispatch<ThemeInterface>;
}

interface DarkContainerInterface {
  children: ReactNode
}

export const ThemeContext = createContext<ThemeContextInterface>({
  dark: {
    dark: false,
  },
  darkDispatch: () => { },
});

const initialState = (): InitialStateInterface => {
  if (localStorage.getItem(theme_key)) {
    return JSON.parse(localStorage.getItem(theme_key) || "");
  } else {
    return { dark: false };
  }
};

const reducer = (state:InitialStateInterface, action:ThemeInterface) => {
  switch (action.type) {
    case "dark":
      return {
        dark: !state.dark,
      };
    default:
      return state;
  }
};

export const DarkContainer: FC<DarkContainerInterface> = ({ children }) => {
  const [dark, darkDispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    localStorage.setItem(theme_key, JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, darkDispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
