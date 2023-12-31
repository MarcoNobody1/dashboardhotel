import { useContext } from 'react';
import styled from "styled-components";
import { DefaultIcon } from "../GeneralComponents/GeneralComponents";
import { useNavigate } from "react-router";
import { FC } from "react";
import { ThemeContext } from "../../Context/ToggleTheme";

interface ImageWrapperInterface {
  dark?: boolean
}

const ImageWrapper = styled.div<ImageWrapperInterface>`
  padding: 20px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: all 0.3s ease-out;
  margin-right: 22px;
  background-color: ${(props) => props.dark ? "#E234281C" : "#ffedec"};
`;

const NotificationIcon = styled(DefaultIcon)`
  color: #e23428;
`;

const NotificationOuter = styled.div`
  width: 340px;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;
  padding: 30px;
  display: inline-block;
  margin-right: 20px;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 4px 4px #00000029;
  }

  &:hover ${ImageWrapper} {
    background-color: #e23428;
    transform: scale(1.1);
  }

  &:hover ${NotificationIcon} {
    color: #fff;
    transform: scale(1.15);
    animation: pulsate-fwd 1.5s ease-in-out infinite both;
  }

  @keyframes pulsate-fwd {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1.1);
  }
}
`;

const ContentWrap = styled.div`
  display: inline-block;
`;

const NotificationNumber = styled.h5`
  text-align: left;
  font: normal normal 600 30px/46px Poppins;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.25s ease-in-out;
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

interface NotificationProps {
  icon: React.ElementType;
  number: string;
  text: string;
}
export const Notification: FC<NotificationProps> = (props) => {
  const Icon = () => <NotificationIcon as={props.icon} />;
  const nav = useNavigate();
  const { dark } = useContext(ThemeContext);


  return (
    <>
      <NotificationOuter
        style={{ backgroundColor: dark.dark ? "#202020" : "#FFF" }}
        onClick={() => {
          nav("/bookings");
        }}
      >
        <NotificationWrapper>
          <ImageWrapper dark={dark.dark}>
            <Icon />
          </ImageWrapper>
          <ContentWrap>
            <NotificationNumber style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}>{props.number}</NotificationNumber>
            <NotificationType>{props.text}</NotificationType>
          </ContentWrap>
        </NotificationWrapper>
      </NotificationOuter>
    </>
  );
};
