import { useEffect, createContext, useReducer, ReactNode, FC } from "react";

const auth_key: string = "auth_info";

interface InitialStateInterface {
  authenticated: boolean,
  username: string | null,
  email: string | null,
  photo: string | null,
}

interface LoginInterface {
  type: "login";
  payload: {
    username: string;
    email: string;
    photo: string;
  };
}

interface LogoutInterface {
  type: "logout";
}

interface UpdateInterface {
  type: "update";
  payload: {
    username: string;
    email: string;
    photo: string;
  };
}

type Actions = LoginInterface | LogoutInterface | UpdateInterface;

interface AuthContextInterface {
  auth: InitialStateInterface;
  authDispatch: React.Dispatch<Actions>;
}


export const AuthContext = createContext<AuthContextInterface>({
  auth: {
    authenticated: false,
    username: 'admin',
    email: 'admin',
    photo: '',
  },
  authDispatch: () => { },
});



const initialState = (): InitialStateInterface => {

 const initial = { authenticated: false, username: null, email: null, photo: "https://robohash.org/smartass" };
  const localKey = localStorage.getItem(auth_key) || "";

  if (localKey) {
    return {...initial, ...JSON.parse(localKey)};
  } else {
    return initial;
  }
};

const reducer = (state: InitialStateInterface, action: Actions) => {
  switch (action.type) {
    case "login":
      return {
        authenticated: true,
        username: action.payload.username,
        email: action.payload.email,
        photo: action.payload.photo,
      };
    case "logout":
      localStorage.removeItem("token");
      return { authenticated: false, username: null, email: null, photo: null };

    case "update":
      return {
        authenticated: true,
        username: action.payload.username,
        email: action.payload.email,
        photo: action.payload.photo,
      };
    default:
      return state;
  }
};

interface AuthContainerInterface {
  children: ReactNode
}


export const AuthContainer: FC<AuthContainerInterface> = ({ children }) => {
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
