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
} from "../GeneralComponents";
import { Floater } from "../Bookings/Bookings";
import { Hourglass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  contactdetailData,
  contactsInfo,
  contactstatusinfo,
  detailStatus,
} from "../features/Contact/contactSlice";
import {
  get1ContactData,
  getContactsData,
} from "../features/Contact/contatctThunks";

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
    const [currentContact, setCurrentContact] = useState([]);
    
    useEffect(() => {
      dispatch(get1ContactData(idContact));
    }, [idContact]);

    useEffect(() => {
      if (detailContactStatus === "rejected") {
        setCurrentStatus(detailContactStatus);
      } else if (detailContactStatus === "pending") {
        setCurrentStatus(detailContactStatus);
      } else if (detailContactStatus === "fulfilled") {
        setCurrentStatus(detailContactStatus);
        setCurrentContact(selectedContact);
      }
    }, [selectedContact, detailContactStatus]);

    return (
      <>
        {currentStatus === "fulfilled" ? (
          <>
            <ModalBackground>
              <ModalContainer>
                <FullName>{currentContact.customer.name}</FullName> */
                <CrossIcon onClick={onClose} />
                <EmailAddress>{currentContact.customer.email}</EmailAddress>
                <PhoneNumber>{currentContact.customer.phone}</PhoneNumber>
                <Subject>{currentContact.subject}</Subject>
                <ModalContent>{currentContact.comment}</ModalContent>
              </ModalContainer>
            </ModalBackground>
          </>
        ) : currentStatus === "rejected" ? (
          alert("not good")
        ) : (
          <Floater>
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#135846", "#e23428"]}
            />
          </Floater>
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
            <Modal idContact={currentId} onClose={() => setIsModalOpen(false)} />
          )}
        </>
      ) : currentStatus === "rejected" ? (
        alert("not good")
      ) : (
        <Floater>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#135846", "#e23428"]}
          />
        </Floater>
      )}
    </>
  );
};
