import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login/Login";
import { Dashboard } from "./Dashboard/Dashboard";
import { PrivateRoute } from "./Login/PrivateRoute";
import { Bookings } from "./Bookings/Bookings";
import { Rooms } from "./Rooms/Rooms";
import { Contact } from "./Contact/Contact";
import { Users } from "./Users/Users";
import { Header } from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <OuterContainer>
          {loggedIn && <Sidebar />}
          <InnerContainer>
            {loggedIn && (
              <Header titleText="Dashboard" setLoggedIn={setLoggedIn} />
            )}
            <Routes>
              <Route
                path="/login"
                element={<Login setLoggedIn={setLoggedIn} />}
              />
              <Route
                path="/"
                element={
                  <PrivateRoute loggedIn={loggedIn}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <PrivateRoute loggedIn={loggedIn}>
                    <Bookings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rooms"
                element={
                  <PrivateRoute loggedIn={loggedIn}>
                    <Rooms />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <PrivateRoute loggedIn={loggedIn}>
                    {" "}
                    <Contact />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute loggedIn={loggedIn}>
                    <Users />
                  </PrivateRoute>
                }
              />
            </Routes>
          </InnerContainer>
        </OuterContainer>
      </BrowserRouter>
    </>
  );
};
