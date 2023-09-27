import React from "react";
import styled from "styled-components";
import logo from "../assets/LogoHotelHub.png";
import { DefaultIcon } from "../GeneralComponents";
import {
  LuLayoutDashboard,
  LuKeyRound,
  LuCalendarCheck2,
  LuUser2,
} from "react-icons/lu";
import { TbMessage2 } from "react-icons/tb";
import { UserCard } from "./UserCard";
import { NavLink } from "react-router-dom";

const NavWrap = styled.aside`
  width: 345px;
  background-color: #fff;
  padding: 42px 0px;
  min-width: 300px;
  text-align: center;
  float: left;
`;

const Logo = styled.img`
  padding-left: 10px;
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

const OptionWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px 0;
  cursor: pointer;
  color: #799283;
  transition: all 250ms ease-out;
  text-decoration: none;

  &:hover {
    color: #e23428;
    border-left: 8px solid #e23428;
  }

  &.active {
    color: #e23428;
    border-left: 8px solid #e23428;
  }

  &:nth-child(6) {
    margin-bottom: 41px;
  }
`;

const OptionTitle = styled.span`
  text-align: left;
  font: normal normal normal 18px/27px Poppins;
  letter-spacing: 0px;
  color: inherit;
`;

const SidebarIcon = styled(DefaultIcon)`
  margin: 0 10px 0 20px;
  color: inherit;
  &:hover {
    transform: scale(1);
  }
`;

const DashboardIcon = () => <SidebarIcon as={LuLayoutDashboard} />;

const RoomsIcon = () => <SidebarIcon as={LuKeyRound} />;

const BookingsIcon = () => <SidebarIcon as={LuCalendarCheck2} />;

const ContactIcon = () => <SidebarIcon as={TbMessage2} />;

const UsersIcon = () => <SidebarIcon as={LuUser2} />;

const Footer = styled.div`
  text-align: center;
  width: max-content;
  display: inline-block;
  margin: 0 auto 20px;
`;

const FooterName = styled.p`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #212121;
  text-transform: capitalize;
`;

const FooterRights = styled.p`
  text-align: left;
  font: normal normal 300 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
`;

const FooterFinal = styled(FooterRights)`
  text-align: center;
`;

export const Sidebar = () => {
  return (
    <>
      <NavWrap>
        <Logo src={logo} />
        <OptionWrapper to="/" title="dashboard">
          <DashboardIcon />
          <OptionTitle>Dashboard</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/rooms" title="rooms">
          <RoomsIcon />
          <OptionTitle>Rooms</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/bookings">
          <BookingsIcon />
          <OptionTitle>Bookings</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/contact">
          <ContactIcon />
          <OptionTitle>Contact</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/users">
          <UsersIcon />
          <OptionTitle>Users</OptionTitle>
        </OptionWrapper>
        <UserCard />
        <Footer>
          <FooterName>hotelHub admin dashboard</FooterName>
          <FooterRights>© 2023 All Rights Reserved</FooterRights>
        </Footer>
        <FooterFinal>Made with ♥ by MarcoNobody</FooterFinal>
      </NavWrap>
    </>
  );
};

export default Sidebar;
