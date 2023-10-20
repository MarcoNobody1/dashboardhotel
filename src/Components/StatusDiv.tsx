import styled from "styled-components";
import React, { FC } from "react";


const GeneralStatusDiv = styled.div<{status: string | undefined}>`
  font: normal normal 500 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 26px;
  text-align: center;
  text-transform: capitalize;
  width: 70%;
  background-color: ${(props) =>
    props.status === "Check In" || props.status === "available" || props.status === "active"
      ? "#e8ffee"
      : props.status === "Check Out" || props.status === "booked" || props.status === "inactive"
      ? "#FFEDEC"
      : "#FEFFC2"};
  color: ${(props) =>
    props.status === "Check In" || props.status === "available" || props.status === "active"
      ? "#5ad07a"
      : props.status === "Check Out" || props.status === "booked" || props.status === "inactive"
      ? "#E23428"
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

  const statusData =
    roomsData !== null
      ? roomsData
      : bookingsData !== null
      ? bookingsData
      : usersData !== null
      ? usersData
      : data.availability;

  return (
    <GeneralStatusDiv data-testid="bookingStatusDiv" status={statusData}>
      {statusData}
    </GeneralStatusDiv>
  );
};
