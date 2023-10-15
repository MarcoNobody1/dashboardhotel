import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowsFullscreen, BsFillBookmarkCheckFill } from "react-icons/bs";
import {
  CommentContainer,
  CrossIcon,
  MessageContent,
  ModalBackground,
  ModalContainer,
  ModalContent,
  RenderError,
  RenderLoading,
} from "../../GeneralComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  contactdetailData,
  contactsInfo,
  contactstatusinfo,
  detailStatus,
} from "../../features/Contact/contactSlice";
import {
  get1ContactData,
  getContactsData,
} from "../../features/Contact/contatctThunks";
import { CommentModal } from "./CommentsModal";

const CommentsWrapper = styled.div`
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
  const [currenContacts, setCurrentContacts] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentId, setCurrentId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsData());
  }, [dispatch]);

  
  useEffect(() => {
    if (statusInfo === "rejected") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "pending") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "fulfilled") {
      setCurrentStatus(statusInfo);
      setCurrentContacts(infoContacts);
    }
  }, [infoContacts, statusInfo]);


  const handleOpenModal = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  };
  
  const Modal = ({ idContact, onClose }) => {
    const selectedContact = useSelector(contactdetailData);
    const detailContactStatus = useSelector(detailStatus);
    
    useEffect(() => {
      dispatch(get1ContactData(idContact));
    }, [idContact]);

    return (
      <>
        {detailContactStatus === "fulfilled" ? (
          <>
            <ModalBackground>
              <ModalContainer>
                <FullName>{selectedContact.customer.name}</FullName>
                <CrossIcon onClick={onClose} />
                <EmailAddress>{selectedContact.customer.email}</EmailAddress>
                <PhoneNumber>{selectedContact.customer.phone}</PhoneNumber>
                <Subject>{selectedContact.subject}</Subject>
                <ModalContent>{selectedContact.comment}</ModalContent>
              </ModalContainer>
            </ModalBackground>
          </>
        ) : detailContactStatus === "rejected" ? (
         <RenderError />
        ) : (
          <RenderLoading />
        )}
      </>
    );
  };

  return (
    <>
      {currentStatus === "fulfilled" ? (
        <>
          <CommentsWrapper>
            {currenContacts.map((contact) => (
              <CommentContainer key={contact.date.id}>
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
              </CommentContainer>
            ))}
          </CommentsWrapper>

          {isModalOpen && (
            <CommentModal idContact={currentId} onClose={() => setIsModalOpen(false)} />
          )}
        </>
      ) : currentStatus === "rejected" ? (
        <RenderError />
      ) : (
        <RenderLoading/>
      )}
    </>
  );
};
