import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { BsMailbox2, BsBellFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { DefaultIcon } from "../GeneralComponents";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Login/Auth";
import { ToggleContext } from "../Sidebar/ToggleSidebar";

const OuterWrap = styled.nav`
  background-color: #fff;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const IconWrap = styled.div`
  flex: 1;
  text-align: center;
`;

const MenuIcon = () => <DefaultIcon as={PiArrowsLeftRightBold} />;

const MessageIcon = () => <DefaultIcon as={BsMailbox2} />;

const BellIcon = () => <DefaultIcon as={BsBellFill} />;

const LogOutIcon = () => <DefaultIcon as={FiLogOut} />;

const Title = styled.h1`
  font: normal normal 600 28px/42px Poppins;
  text-align: left;
  color: #262626;
  flex: 8;
`;

export const Header = () => {
  const navigate = useNavigate();
  const { auth, authDispatch } = useContext(AuthContext);
  const { toggleDispatch } = useContext(ToggleContext);
  const [title, setTitle] = useState("Dashboard");
  const location = useLocation();

  useEffect(()=>{
    switch (location.pathname) {
      case "/contact":
        setTitle("Contact");
        break;
      case "/bookings":
        setTitle("Bookings");
        break;
      case "/users":
        setTitle("Users");
        break;
      case "/rooms":
        setTitle("Rooms");
        break;
        default:
      if (location.pathname.startsWith("/bookings/")) {
        setTitle("Booking Details");
      } else {
        setTitle("Dashboard");
      }
    }
  },[location.pathname])

  if (!auth.authenticated) {
    return null;
  }

  const handleLogOut = () => {
    authDispatch({ type: "logout" });
    navigate("/login");
  };

  const handleToggle = () => {
    toggleDispatch({type: 'toggle'});
  }

  return (
    <>
      <OuterWrap>
        <IconWrap onClick={handleToggle} >
          <MenuIcon />
        </IconWrap>
        <Title>{title}</Title>
        <IconWrap>
          <MessageIcon />
        </IconWrap>
        <IconWrap>
          <BellIcon />
        </IconWrap>
        <IconWrap onClick={handleLogOut}>
          <LogOutIcon />
        </IconWrap>
      </OuterWrap>
    </>
  );
};
