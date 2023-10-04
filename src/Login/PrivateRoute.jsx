import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./Auth";

export const PrivateRoute = ({children }) => {
const { auth } = useContext(AuthContext);

  if (!auth.authenticated) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  return children
};
