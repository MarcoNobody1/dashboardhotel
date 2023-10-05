import styled from "styled-components";
import { DefaultIcon } from "../GeneralComponents";
import { useNavigate } from "react-router";

const ImageWrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: #ffedec;
  border-radius: 8px;
  transition: all 250ms ease-out;
  margin-right: 22px;
`;

const NotificationIcon = styled(DefaultIcon)`
  color: #e23428;
`;

const NotificationOuter = styled.div`
  width: 340px;
  background: #ffffff;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;
  padding: 30px;
  display: inline-block;
  margin-right: 20px;
  transition: all 250ms ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &:hover ${ImageWrapper} {
    background-color: #e23428;
  }

  &:hover ${NotificationIcon} {
    color: #fff;
  }
`;

const ContentWrap = styled.div`
  display: inline-block;
`;

const NotificationNumber = styled.h5`
  text-align: left;
  font: normal normal 600 30px/46px Poppins;
  letter-spacing: 0px;
  color: #393939;
  user-select: none;
`;

const NotificationType = styled.p`
  text-align: left;
  font: normal normal 300 14px/21px Poppins;
  letter-spacing: 0px;
  color: #787878;
  user-select: none;
`;

const NotificationWrapper = styled.div`
  display: flex;
`;

export const Notification = (props) => {
  const Icon = () => <NotificationIcon as={props.icon} />;
  const nav = useNavigate();

  return (
    <>
      <NotificationOuter
        onClick={() => {
          nav("/bookings");
        }}
      >
        <NotificationWrapper>
          <ImageWrapper>
            <Icon />
          </ImageWrapper>
          <ContentWrap>
            <NotificationNumber>{props.number}</NotificationNumber>
            <NotificationType>{props.text}</NotificationType>
          </ContentWrap>
        </NotificationWrapper>
      </NotificationOuter>
    </>
  );
};
