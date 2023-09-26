import { Navigate } from "react-router";

const log = JSON.parse(localStorage.getItem('log'));

export const PrivateRoute = ({ loggedIn, children }) => {
  if (loggedIn || log) {
    return (children);
  } else {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
};
