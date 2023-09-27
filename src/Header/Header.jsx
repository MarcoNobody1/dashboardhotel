import React from "react";
import styled from "styled-components";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { BsMailbox2, BsBellFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { DefaultIcon } from "../GeneralComponents";
import { useNavigate } from "react-router";

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

export const Header = (props) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("log");
    props.setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <OuterWrap>
        <IconWrap>
          <MenuIcon />
        </IconWrap>
        <Title>{props.titleText}</Title>
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
