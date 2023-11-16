import { FC, ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/Auth";

interface PrivateRouteInterface {
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteInterface> = ({ children }) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);


  const routes: string[] = ["/bookings", "/users", "/contacts", "/rooms", "/login"];



  if (!authContext || !authContext.auth.authenticated) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  return children;
};
