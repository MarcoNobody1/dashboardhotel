import React, { useContext, useState } from "react";
import styled from "styled-components";
import profileImg from "../assets/ProfilePic.jpg";
import { AuthContext } from "../Login/Auth";
import {
  CrossIcon,
  ModalBackground,
  ModalContainer,
  ModalContent,
} from "../GeneralComponents";
import { Input } from "../Login/Login";

const OuterWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  position: relative;
  margin-bottom: 40px;
`;

const ImageWrap = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background: #c5c5c5;
  overflow: hidden;
  position: relative;
  z-index: 2;
`;

const ContentWrap = styled.div`
  padding: 53px 35px 24px;
  background: #ffffff;
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  margin-top: -35px;
  position: relative;
  z-index: 1;
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const FullName = styled.h4`
  text-align: center;
  font: normal normal medium 1rem/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
  margin-bottom: 9px;
`;

const EmailText = styled.p`
  text-align: center;
  font: normal normal 300 12px/18px Poppins;
  letter-spacing: 0px;
  color: #b2b2b2;
  margin-bottom: 16px;
`;

const EditButton = styled.button`
  background: #ebf1ef;
  border-radius: 8px;
  text-align: center;
  font: normal normal 600 14px/21px Poppins;
  letter-spacing: 0px;
  color: #135846;
  width: 100%;
  min-height: 47px;
  border: none;
  transition: all 250ms ease-out;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const ProfileLabel = styled.label`
  display: inline-block;
  font: normal normal 400 16px/27px Poppins;
  letter-spacing: 0px;
  margin-right: 15px;
`;

export const UserCard = () => {
  const { auth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal = ({ onClose }) => {
    return (
      <ModalBackground>
        <ModalContainer style={{ maxWidth: "700px", minWidth: "600px"}}>
          <CrossIcon onClick={onClose} />
          <ProfileLabel>Username: </ProfileLabel>
          <Input
            style={{ maxWidth: "300px", display: "inline-block" }}
            placeholder="Type your username"
          />
          <br />
          <ProfileLabel>Email: </ProfileLabel>
          <Input
            style={{ maxWidth: "300px", display: "inline-block" }}
            placeholder="Type your personal e-mail"
          />
          <ModalContent>Hello World!</ModalContent>
          <EditButton>Change it!</EditButton>
        </ModalContainer>
      </ModalBackground>
    );
  };

  return (
    <>
      <OuterWrap>
        <ImageWrap>
          <ProfilePic src={profileImg} />
        </ImageWrap>
        <ContentWrap>
          <FullName>{auth.username}</FullName>
          <EmailText>{auth.email}</EmailText>
          <EditButton onClick={() => setIsModalOpen(true)}>Edit</EditButton>
        </ContentWrap>
      </OuterWrap>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
