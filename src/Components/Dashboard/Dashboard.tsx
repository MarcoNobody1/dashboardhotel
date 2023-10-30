import React, { FC, useContext } from "react";
import { PageWrapper } from "../GeneralComponents/GeneralComponents";
import { LiaBedSolid } from "react-icons/lia";
import { LuCalendarCheck2 } from "react-icons/lu";
import { BsBoxArrowInRight, BsBoxArrowRight } from "react-icons/bs";
import styled from "styled-components";
import { Notification } from "./NotificationPreview";
import { Comments } from "../Contacts/CommentsPreview";
import { ThemeContext } from "../../Context/ToggleTheme";

const NotifContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

export const CommentsContainer = styled(NotifContainer)`
  margin-bottom: 0;
  flex-direction: column;
  padding: 30px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
`;

export const CommentsTitle = styled.p`
  text-align: left;
  font: normal normal 500 20px/30px Poppins;
  letter-spacing: 0px;
  margin-bottom: 30px;
  transition: all 0.25s ease-in-out;
`;

export const Dashboard: FC = () => {
  const { dark } = useContext(ThemeContext);

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
        <CommentsContainer style={{ backgroundColor: dark.dark ? "#202020" : "#fff"}}>
          <CommentsTitle style={{ color: dark.dark ? "#E8F2EF" : "#393939"}}>Latest Review by Customers</CommentsTitle>
          <Comments />
        </CommentsContainer>
      </PageWrapper>
    </>
  );
};
