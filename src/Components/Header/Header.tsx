import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { BsMailbox2, BsBellFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { DefaultIcon } from "../GeneralComponents/GeneralComponents";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/Auth";
import { ToggleContext } from "../../Context/ToggleSidebar";
import { FC } from 'react';
import { SwitchSunMoon } from "./SwitchSunMoon"; "react";
import { ThemeContext } from "../../Context/ToggleTheme";

interface ThemeProps {
  dark?: Object
}

const OuterWrap = styled.nav<ThemeProps>`
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 3px 10px #00000005;
  transition: all 0.25s ease-in-out;
`;

const IconWrap = styled.div`
  flex: 1;
  text-align: center;
`;

const MenuIcon = () => {
  const { dark } = useContext(ThemeContext);
return <DefaultIcon style={{  color: dark.dark? "#41ebbd" : "#135846" }} as={PiArrowsLeftRightBold} />
};

const MessageIcon = () => {
  const { dark } = useContext(ThemeContext);
  return <DefaultIcon style={{  color: dark.dark? "#41ebbd" : "#135846" }} as={BsMailbox2} /> 
};

const BellIcon = () => {
  const { dark } = useContext(ThemeContext);
return <DefaultIcon style={{  color: dark.dark? "#41ebbd" : "#135846" }} as={BsBellFill} />
};

const LogOutIcon = () => {
  const { dark } = useContext(ThemeContext);
return <DefaultIcon style={{  color: dark.dark? "#41ebbd" : "#135846" }} as={FiLogOut} />
};

const Title = styled.h1<ThemeProps>`
  font: normal normal 600 28px/42px Poppins;
  text-align: left;
  color: ${(props) => (props.dark ? "#FFF" : "#262626")};
  flex: 8;
  transition: all 0.25s ease-in-out;
`;

export const Header: FC = () => {
  const navigate = useNavigate();
  const { auth, authDispatch } = useContext(AuthContext);
  const { toggleDispatch } = useContext(ToggleContext);
  const [title, setTitle] = useState("Dashboard");
  const location = useLocation();
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
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
        } else if (location.pathname.startsWith("/rooms/")) {
          setTitle("Room Type");
        } else {
          setTitle("Dashboard");
        }
    }
  }, [location.pathname])

  if (!auth.authenticated) {
    return <SwitchSunMoon absolute={true} />;
  }

  const handleLogOut = () => {
    authDispatch({ type: "logout" });
    navigate("/login");
  };

  const handleToggle = () => {
    toggleDispatch({ type: 'toggle' });
  }

  return (
    <>
      <OuterWrap dark={dark.dark}>
        <IconWrap onClick={handleToggle} >
          <MenuIcon />
        </IconWrap>
        <Title dark={dark.dark}>{title}</Title>
        <SwitchSunMoon absolute={false} />
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
