import { useContext } from "react";
import styled from "styled-components";
import { DefaultIcon } from "../GeneralComponents/GeneralComponents";
import {
  LuLayoutDashboard,
  LuKeyRound,
  LuCalendarCheck2,
  LuUser2,
} from "react-icons/lu";
import { TbMessage2 } from "react-icons/tb";
import { UserCard } from "./UserCard";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { ToggleContext } from "../../Context/ToggleSidebar";
import { ThemeContext } from "../../Context/ToggleTheme";

const NavWrap = styled.aside`
  min-width: 345px;
  height: 100vh;
  text-align: center;
  transition: all 0.25s ease-in-out;
`;

const Logo = styled.div`
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transition: all 0.25s ease-in-out;
  &:hover{
    cursor: pointer;
  }
`;

const OptionWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px 0;
  cursor: pointer;
  color: #799283;
  border-left: 0px solid #e23428;
  transition: all 150ms ease-out;
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
    margin-bottom: 10px;
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
  transition: all 0.25s ease-in-out;
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
  const { auth } = useContext(AuthContext);
  const { toggle } = useContext(ToggleContext);
  const { dark } = useContext(ThemeContext);
  const nav = useNavigate();

  if (!auth.authenticated) {
    return null;
  }

  return (
    <>
      <NavWrap
        style={{
          marginLeft: toggle.toggle ? "-345px" : "0",
          backgroundColor: dark.dark ? "#202020" : "#FFF",
        }}
      >
        <Logo
          onClick={() => {
            nav("/");
          }}
          style={{
            backgroundImage: dark.dark
              ? "url(https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/LogoDark.png)"
              : "url(https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/Logo.png)",
          }}
        />
        <OptionWrapper to="/" title="dashboard">
          <DashboardIcon />
          <OptionTitle>Dashboard</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/rooms" title="rooms">
          <RoomsIcon />
          <OptionTitle>Rooms</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/bookings" title="bookings">
          <BookingsIcon />
          <OptionTitle>Bookings</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/contact" title="contact">
          <ContactIcon />
          <OptionTitle>Contact</OptionTitle>
        </OptionWrapper>
        <OptionWrapper to="/users" title="users">
          <UsersIcon />
          <OptionTitle>Users</OptionTitle>
        </OptionWrapper>
        <UserCard />
        <Footer>
          <FooterName style={{ color: dark.dark ? "#FFF" : "#212121" }}>
            hotelHub admin dashboard
          </FooterName>
          <FooterRights>© 2023 All Rights Reserved</FooterRights>
        </Footer>
        <FooterFinal>Made with ♥ by MarcoNobody</FooterFinal>
      </NavWrap>
    </>
  );
};

export default Sidebar;
