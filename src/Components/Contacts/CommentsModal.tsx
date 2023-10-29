import React, { useContext, useEffect } from "react";
import {
  contactdetailData,
  detailStatus,
} from "../../features/Contact/contactSlice";
import styled from "styled-components";
import {
  CrossIcon,
  ModalContent,
  ModalBackground,
  ModalContainer
} from "../GeneralComponents/GeneralComponents";
import { get1ContactData } from "../../features/Contact/contactThunks";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FC } from 'react';
import { ThemeContext } from "../../Context/ToggleTheme";

const FullName = styled.h5`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #262626;
`;

const EmailAddress = styled.p`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
`;

const PhoneNumber = styled(EmailAddress)`
  font: normal normal normal 10px/21px Poppins;
  margin-bottom: 10px;
`;

const Subject = styled(FullName)`
  font: normal normal 600 14px/25px Poppins;
  text-align: right;
  margin-bottom: 10px;
`;

interface CommentModalProps {
  idContact: string;
  onClose: () => void;
}

export const CommentModal: FC<CommentModalProps>= ({ idContact, onClose }) => {
  const selectedContact = useAppSelector(contactdetailData);
  const detailContactStatus = useAppSelector(detailStatus);
  const dispatch = useAppDispatch();
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(get1ContactData(idContact));
  }, [idContact, dispatch]);

  const data = () => {
    return ( <>
      <FullName style={{color: dark.dark ? "#FFF" : "#262626"}}>{selectedContact.customer.name}</FullName>
      <EmailAddress>{selectedContact.customer.email}</EmailAddress>
      <PhoneNumber>{selectedContact.customer.phone}</PhoneNumber>
      <Subject style={{color: dark.dark ? "#FFF" : "#262626"}}>{selectedContact.subject}</Subject>
      <ModalContent style={{color: dark.dark ? "#FFF" : "#262626"}}>{selectedContact.comment}</ModalContent>
    </>);
  }


  return (
    <>
      <ModalBackground>
        <ModalContainer style={{backgroundColor: dark.dark ? "#262626" : "#FFF" }}>
          <CrossIcon onClick={onClose} />
          {renderStatus(detailContactStatus, data)}
        </ModalContainer >
      </ModalBackground>
    </>
  );
};
