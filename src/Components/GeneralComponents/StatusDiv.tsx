import styled from "styled-components";
import React, { FC, useContext } from "react";
import { ThemeContext } from "../../Context/ToggleTheme";

interface StatusDivProps {
  status?: string;
  dark?: boolean;
}

const GeneralStatusDiv = styled.div<StatusDivProps>`
  font: normal normal 500 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 26px;
  text-align: center;
  text-transform: capitalize;
  transition: all 250ms ease-in-out;
  width: 80%;
  background-color: ${(props) =>
    (props.status === "Check In" || props.status === "Available" || props.status === "active") && props.dark
      ? "#5ad07a"
      : props.status === "Check In" || props.status === "Available" || props.status === "active"
      ? "#e8ffee"
      : (props.status === "Check Out" || props.status === "Booked" || props.status === "inactive") && props.dark
      ? "#E23428"
      : props.status === "Check Out" || props.status === "Booked" || props.status === "inactive"
      ? "#FFEDEC"
      : props.dark
      ? "#E2B308"
      : "#FEFFC2"};
  color: ${(props) =>
    (props.status === "Check In" || props.status === "Available" || props.status === "active") && props.dark
      ? "#e8ffee"
      : props.status === "Check In" || props.status === "Available" || props.status === "active"
      ? "#5ad07a"
      : (props.status === "Check Out" || props.status === "Booked" || props.status === "inactive") && props.dark
      ? "#FFEDEC"
      : props.status === "Check Out" || props.status === "Booked" || props.status === "inactive"
      ? "#E23428"
      : props.dark
      ? "#FEFFC2"
      : "#E2B308"};
`;

interface StatusDivProps {
  data?: {
    availability?: string;
    status?: string;
    activity?: string;
  };
}

export const StatusDiv: FC<StatusDivProps> = ({ data = { availability: "Loading..." } }) => {
  const roomsData = data.availability !== undefined ? data.availability : null;
  const bookingsData = data.status !== undefined ? data.status : null;
  const usersData = data.activity !== undefined ? data.activity : null;
  const { dark } = useContext(ThemeContext);

  const statusData =
    roomsData !== null
      ? roomsData
      : bookingsData !== null
      ? bookingsData
      : usersData !== null
      ? usersData
      : data.availability;

  return (
    <GeneralStatusDiv dark={dark.dark} data-testid="bookingStatusDiv" status={statusData}>
      {statusData}
    </GeneralStatusDiv>
  );
};
