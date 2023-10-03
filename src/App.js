import { useEffect, useState } from "react";
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
import BookingDetails from "./Bookings/BookingDetails";
import { useDispatch } from "react-redux";
import { getData } from "./features/Bookings/bookingThunks";

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [title, setTitle] = useState("Dashboard")
  const dispatch = useDispatch();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("log");
    if (isLoggedIn) {
      setLoggedIn(true);
    }
      dispatch(getData());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {loggedIn && <Sidebar setTitle={setTitle}/>}
        {loggedIn && <Header titleText={title} setLoggedIn={setLoggedIn} />}
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
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
            path="/bookings/:id"
            element={
              <PrivateRoute loggedIn={loggedIn}>
                <BookingDetails />
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
      </BrowserRouter>
    </>
  );
};
