import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../GeneralComponents";
import { get1ContactData } from "../../features/Contact/contatctThunks";
import { renderStatus } from "../RenderStatus";

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



export const CommentModal = ({ idContact, onClose }) => {
  const selectedContact = useSelector(contactdetailData);
  const detailContactStatus = useSelector(detailStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get1ContactData(idContact));
  }, [idContact, dispatch]);

  const data = () => {
    return ( <>
      <FullName>{selectedContact.customer.name}</FullName>
      <EmailAddress>{selectedContact.customer.email}</EmailAddress>
      <PhoneNumber>{selectedContact.customer.phone}</PhoneNumber>
      <Subject>{selectedContact.subject}</Subject>
      <ModalContent>{selectedContact.comment}</ModalContent>
    </>);
  }


  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <CrossIcon onClick={onClose} />
          {renderStatus(detailContactStatus, data)}
        </ModalContainer>
      </ModalBackground>
    </>
  );
};
