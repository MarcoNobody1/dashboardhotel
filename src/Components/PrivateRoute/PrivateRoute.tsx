import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../Context/Auth";

interface PrivateRouteInterface {
  children: ReactNode
}

export const PrivateRoute: FC<PrivateRouteInterface> = ({ children }) => {
const authContext = useContext(AuthContext);

  if (!authContext || !authContext.auth.authenticated) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  return children
};
