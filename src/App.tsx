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
import { AuthContainer } from "./Login/Auth";
import { ToggleContainer } from "./Sidebar/ToggleSidebar";
import RoomDetails from "./Rooms/RoomDetails";
import { InnerLayout, Layout } from "./GeneralComponents";
import { FC } from 'react';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthContainer>
        <ToggleContainer>
          <Layout>
            <Sidebar />
            <InnerLayout>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route
                        path="/bookings/:id"
                        element={<BookingDetails />}
                      />
                      <Route path="/rooms" element={<Rooms />} />
                      <Route path="/rooms/:id" element={<RoomDetails />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/users" element={<Users />} />
                    </Routes>
                  </PrivateRoute>
                }
              />
            </Routes>
            </InnerLayout>
          </Layout>
        </ToggleContainer>
      </AuthContainer>
    </BrowserRouter>
  );
};
