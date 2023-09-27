import React from "react";
import { Notification, PageWrapper } from "../GeneralComponents";
import { LiaBedSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { BsBoxArrowInRight, BsBoxArrowRight } from "react-icons/bs";
import styled from "styled-components";

const NotifContainer = styled.div`
  display: flex;
  width: 1474px;
  margin-bottom: 40px;
`;

export const Dashboard = () => {
  return (
    <>
      <PageWrapper>
        <NotifContainer>
          <Notification number="8,765" text="New Booking" icon={LiaBedSolid} />
          <Notification
            number="963"
            text="Scheduled Room"
            icon={LuCalendarCheck2}
          />
          <Notification number="753" text="Check In" icon={BsBoxArrowInRight} />
          <Notification number="516" text="Check Out" icon={BsBoxArrowRight} />
        </NotifContainer>


      </PageWrapper>
    </>
  );
};
