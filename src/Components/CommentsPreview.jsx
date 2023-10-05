import { useState } from "react";
import { contactMessages } from "../data/contactjson";
import styled from "styled-components";
import { BsArrowsFullscreen, BsFillBookmarkCheckFill } from "react-icons/bs";
import { CommentContainer, CrossIcon, MessageContent, ModalBackground, ModalContainer, ModalContent } from "../GeneralComponents";


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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
  
    const handleOpenModal = (commentId) => {
      setSelectedCommentId(commentId);
      setIsModalOpen(true);
    };
    const Modal = ({ commentId, onClose }) => {
      const selectedComment = contactMessages.find(
        (message) => message.id === commentId
      );
  
      return (
        <ModalBackground>
          <ModalContainer>
            <FullName>{selectedComment.name}</FullName>
            <CrossIcon onClick={onClose} />
            <EmailAddress>{selectedComment.email}</EmailAddress>
            <PhoneNumber>{selectedComment.phone}</PhoneNumber>
            <Subject>{selectedComment.email_subject}</Subject>
            <ModalContent>{selectedComment.email_description}</ModalContent>
          </ModalContainer>
        </ModalBackground>
      );
    };
  
    return (
      <>
        <CommentsWrapper>
          {contactMessages.map((message) => (
            <CommentContainer key={message.id}>
              <FullName>{message.name}</FullName>
              <IconWrapper>
                <ReadIcon />
                <FullscreenIcon onClick={() => handleOpenModal(message.id)} />
              </IconWrapper>
              <EmailAddress>{message.email}</EmailAddress>
              <PhoneNumber>{message.phone}</PhoneNumber>
              <Subject>{message.email_subject}</Subject>
              <MessageContent>{message.email_description}</MessageContent>
            </CommentContainer>
          ))}
        </CommentsWrapper>
  
        {isModalOpen && (
          <Modal
            commentId={selectedCommentId}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  };