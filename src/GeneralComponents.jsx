import styled from "styled-components";
import { contactMessages } from "./data/contactjson";
import { bookingsData } from "./data/bookingsjson";
import { BsFillBookmarkCheckFill, BsArrowsFullscreen } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

export const DefaultIcon = styled.div.attrs((props) => ({
  $color: props.$color || "#135846",
}))`
  font-size: 24px;
  color: ${(props) => props.$color};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export const PageWrapper = styled.main`
  background-color: #f8f8f8;
  height: 810px;
  padding: 50px;
  margin-left: 345px;
  min-width: 1474px;
`;

export const Notification = (props) => {
  const ImageWrapper = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    background-color: #ffedec;
    border-radius: 8px;
    transition: all 250ms ease-out;
    margin-right: 22px;
  `;

  const NotificationIcon = styled(DefaultIcon)`
    color: #e23428;
  `;

  const NotificationOuter = styled.div`
    width: 340px;
    background: #ffffff;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 12px;
    padding: 30px;
    display: inline-block;
    margin-right: 20px;
    transition: all 250ms ease-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }

    &:hover ${ImageWrapper} {
      background-color: #e23428;
    }

    &:hover ${NotificationIcon} {
      color: #fff;
    }
  `;

  const ContentWrapper = styled.div`
    display: inline-block;
  `;

  const Icon = () => <NotificationIcon as={props.icon} />;

  const NotificationNumber = styled.h5`
    text-align: left;
    font: normal normal 600 30px/46px Poppins;
    letter-spacing: 0px;
    color: #393939;
  `;

  const NotificationType = styled.p`
    text-align: left;
    font: normal normal 300 14px/21px Poppins;
    letter-spacing: 0px;
    color: #787878;
  `;

  const NotificationWrapper = styled.div`
    display: flex;
  `;

  return (
    <>
      <NotificationOuter>
        <NotificationWrapper>
          <ImageWrapper>
            <Icon />
          </ImageWrapper>
          <ContentWrapper>
            <NotificationNumber>{props.number}</NotificationNumber>
            <NotificationType>{props.text}</NotificationType>
          </ContentWrapper>
        </NotificationWrapper>
      </NotificationOuter>
    </>
  );
};

export const Comments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleOpenModal = (commentId) => {
    setSelectedCommentId(commentId);
    setIsModalOpen(true);
  };

  const CommentsWrapper = styled.div`
    background-color: #fff;
    display: flex;
    gap: 40px;
  `;

  const CommentContainer = styled.div`
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #ebebeb;
    border-radius: 20px;
    padding: 30px;
    position: relative;
    transition: all 250ms ease-in-out;

    &:hover {
      box-shadow: 0px 16px 30px #00000014;
    }
  `;

  const FullName = styled.h5`
    text-align: left;
    font: normal normal 600 16px/25px Poppins;
    letter-spacing: 0px;
    color: #262626;
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

  const MessageContent = styled.p`
    text-align: left;
    font: normal normal 300 12px/18px Poppins;
    letter-spacing: 0px;
    color: #6e6e6e;
    overflow: hidden;
    white-space: nowrap;
    max-width: 300px;
    max-height: 70px;
    display: inline-block;
    text-overflow: ellipsis;
  `;

  const Modal = ({ commentId, onClose }) => {
    const selectedComment = contactMessages.find(
      (message) => message.id === commentId
    );

    const ModalContent = styled(MessageContent)`
      max-width: 450px;
      max-height: none;
      white-space: normal;
    `;

    const ModalContainer = styled(CommentContainer)`
      max-width: 500px;
      position: relative;
      z-index: 100;
    `;

    const CrossIcon = styled(RxCross2)`
      color: #799283;
      position: absolute;
      font-size: 24px;
      right: 30px;
      top: 30px;
      &:hover {
        cursor: pointer;
        transform: scale(1.08);
      }
    `;

    const ModalBackground = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 99;
    `;

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

export const TableTitles = () => {
  const bookingKeys = Object.keys(bookingsData[0]);

  const TableTitleWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    text-transform: capitalize; 
  `;

  const BookingTitle = styled.p`
    font: normal normal 600 16px/25px Poppins;
    letter-spacing: 0px;
    color: #393939;
  `;

  return (
    <>
      <TableTitleWrapper>
      {bookingKeys.map((title, index) => (
<BookingTitle key={index}>{title.replace("_", " ")}</BookingTitle>
        ))}
      </TableTitleWrapper>
    </>
  );
};

