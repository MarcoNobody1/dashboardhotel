import React from "react";
import { PageWrapper } from "../GeneralComponents";
import { LiaBedSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { BsBoxArrowInRight, BsBoxArrowRight } from "react-icons/bs";
import styled from "styled-components";
import { Notification } from "../Components/NotificationPreview";
import { Comments } from "../Components/CommentsPreview";

const NotifContainer = styled.div`
  display: flex;
  width: 1474px;
  margin-bottom: 40px;

`;

export const CommentsContainer = styled(NotifContainer)`
  background-color: #fff;
  margin-bottom: 0;
  flex-direction: column;
  padding: 30px;
  width: 1474px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  overflow: hidden;
`;

export const CommentsTitle = styled.p`
  text-align: left;
  font: normal normal 500 20px/30px Poppins;
  letter-spacing: 0px;
  color: #393939;
  margin-bottom: 30px;
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
        <CommentsContainer>
          <CommentsTitle>Latest Review by Customers</CommentsTitle>
          <Comments />
        </CommentsContainer>
      </PageWrapper>
    </>
  );
};
