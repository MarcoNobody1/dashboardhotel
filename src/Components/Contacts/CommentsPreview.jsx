import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowsFullscreen, BsFillBookmarkCheckFill } from "react-icons/bs";
import {
  CommentContainer,
  MessageContent,
  RenderError,
  RenderGlassLoading,
} from "../../GeneralComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  contactsInfo,
  contactstatusinfo,
} from "../../features/Contact/contactSlice";
import { getContactsData } from "../../features/Contact/contatctThunks";
import { CommentModal } from "./CommentsModal";

const CommentsWrapper = styled.div`
  min-width: 360px;
  min-height: 190px;
  background-color: #fff;
  display: flex;
  gap: 40px;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ReadIcon = styled(BsFillBookmarkCheckFill)`
  color: #e23428;
`;

const FullscreenIcon = styled(BsArrowsFullscreen)`
  color: #135846;
  transition: all 250ms ease-in;

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;

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

export const Comments = () => {
  const infoContacts = useSelector(contactsInfo);
  const statusInfo = useSelector(contactstatusinfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsData());
  }, [dispatch]);

  const handleOpenModal = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  };

  const renderStatus = () => {
    if (statusInfo === "fulfilled") {
      return (
        <>
          {infoContacts.map((contact) => (
            <CommentContainer key={contact.date.id}>
              <>
                <FullName>{contact.customer.name}</FullName>
                <IconWrapper>
                  <ReadIcon />
                  <FullscreenIcon
                    onClick={() => handleOpenModal(contact.date.id)}
                  />
                </IconWrapper>
                <EmailAddress>{contact.customer.email}</EmailAddress>
                <PhoneNumber>{contact.customer.phone}</PhoneNumber>
                <Subject>{contact.subject}</Subject>
                <MessageContent>{contact.comment}</MessageContent>
              </>
            </CommentContainer>
          ))}
        </>
      );
    } else if (statusInfo === "rejected") {
      return <RenderError />;
    } else {
      return <RenderGlassLoading />;
    }
  };

  return (
    <>
      <CommentsWrapper>{renderStatus()}</CommentsWrapper>
      {isModalOpen && (
        <CommentModal
          idContact={currentId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
