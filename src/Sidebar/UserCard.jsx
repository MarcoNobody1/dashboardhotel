import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../Login/Auth";
import {
  CrossIcon,
  ModalBackground,
  ModalContainer,
  ModalContent,
} from "../GeneralComponents";

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
  min-width: 257px;
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

const FormChange = styled.form`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputChange = styled.input`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid black;
  transition: all 0.3s ease-out;
`;

const NewProfilePhoto = styled.img`
  max-width: 80px;
  max-height: 80px;
  position: absolute;
  right: 5%;
  bottom: 60%;
`;

export const UserCard = () => {
  const { auth, authDispatch } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Modal = ({ onClose }) => {
    const [newUser, setNewUser] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleUserChange = (event) => {
      console.log(typeof event.target.value.length);
      setNewUser(event.target.value);
    };

    const handleEmailChange = (event) => {
      setNewEmail(event.target.value);
    };

    const handleNewPhoto = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);

        setImageUrl(imageUrl);
      } else {
        alert("Por favor, selecciona un archivo de imagen válido.");
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      authDispatch({
        type: "update",
        payload: { username: newUser, email: newEmail, photo: imageUrl },
      });
      setIsModalOpen(false);
    };

    return (
      <>
        <ModalBackground>
          <ModalContainer style={{ maxWidth: "700px", minWidth: "600px" }}>
            <CrossIcon onClick={onClose} />
            <FormChange onSubmit={handleSubmit}>
              <ProfileLabel htmlFor="photo">Profile Photo: </ProfileLabel>
              <InputChange
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                onChange={handleNewPhoto}
              />
              <ProfileLabel htmlFor="usernamenew">Username: </ProfileLabel>
              <InputChange
                autoComplete="off"
                id="usernamenew"
                name="username"
                onChange={handleUserChange}
                placeholder="Type your username"
              />
              <br />
              {imageUrl && <NewProfilePhoto src={imageUrl} alt="Preview" />}
              <ProfileLabel htmlFor="emailnew">Email: </ProfileLabel>
              <InputChange
                id="emailnew"
                name="email"
                autoComplete="off"
                onChange={handleEmailChange}
                placeholder="Type your personal e-mail"
              />
              <ModalContent>
                Last Username: <strong>{auth.username}</strong>
              </ModalContent>
              <ModalContent>
                Last Email: <strong>{auth.email}</strong>
              </ModalContent>
              <br />
              <EditButton type="submit">Change it!</EditButton>
            </FormChange>
          </ModalContainer>
        </ModalBackground>
      </>
    );
  };

  return (
    <>
      <OuterWrap>
        <ImageWrap>
          <ProfilePic src={auth.photo} />
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
