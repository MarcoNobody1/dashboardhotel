import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { PrivateRoute } from "./Components/PrivateRoute/PrivateRoute";
import { Bookings } from "./Components/Bookings/Bookings";
import { Rooms } from "./Components/Rooms/Rooms";
import { Contact } from "./Components/Contacts/Contact";
import { Users } from "./Components/Users/Users";
import { Header } from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import BookingDetails from "./Components/Bookings/BookingDetails";
import { AuthContainer } from "./Context/Auth";
import { ToggleContainer } from "./Context/ToggleSidebar";
import RoomDetails from "./Components/Rooms/RoomDetails";
import { InnerLayout, Layout } from "./Components/GeneralComponents/GeneralComponents";
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
