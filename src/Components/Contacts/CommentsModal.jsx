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
  ModalContainer,
  RenderError,
} from "../../GeneralComponents";
import { get1ContactData } from "../../features/Contact/contatctThunks";
import { LineWave, MagnifyingGlass } from "react-loader-spinner";

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

const PendingWrapper = styled.div`
  width: 100%;
  min-height: 131px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CommentModal = ({ idContact, onClose }) => {
  const selectedContact = useSelector(contactdetailData);
  const detailContactStatus = useSelector(detailStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get1ContactData(idContact));
  }, [idContact, dispatch]);

  const renderStatus = () => {
    if (detailContactStatus === "fulfilled") {
      return (
        <>
          <FullName>{selectedContact.customer.name}</FullName>
          <EmailAddress>{selectedContact.customer.email}</EmailAddress>
          <PhoneNumber>{selectedContact.customer.phone}</PhoneNumber>
          <Subject>{selectedContact.subject}</Subject>
          <ModalContent>{selectedContact.comment}</ModalContent>
        </>
      );
    } else if (detailContactStatus === "rejected") {
      return <RenderError />;
    } else {
      return (
        <PendingWrapper>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#517A6F"
          color="#E3342C"
        />
        </PendingWrapper>
      );
    }
  };

  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <CrossIcon onClick={onClose} />
          {renderStatus()}
        </ModalContainer>
      </ModalBackground>
    </>
  );
};
