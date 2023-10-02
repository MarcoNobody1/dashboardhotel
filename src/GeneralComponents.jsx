import styled from "styled-components";
import { contactMessages } from "./data/contactjson";
import { BsFillBookmarkCheckFill, BsArrowsFullscreen } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";

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

const ContentWrap = styled.div`
  display: inline-block;
`;

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

export const Notification = (props) => {
  const Icon = () => <NotificationIcon as={props.icon} />;
  const nav = useNavigate();

  return (
    <>
      <NotificationOuter
        onClick={() => {
          nav("/bookings");
        }}
      >
        <NotificationWrapper>
          <ImageWrapper>
            <Icon />
          </ImageWrapper>
          <ContentWrap>
            <NotificationNumber>{props.number}</NotificationNumber>
            <NotificationType>{props.text}</NotificationType>
          </ContentWrap>
        </NotificationWrapper>
      </NotificationOuter>
    </>
  );
};

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

const TableTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-transform: capitalize;
  border-bottom: 1px solid grey;
`;

const BookingTitle = styled.p`
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
  min-width: 130px;
`;

export const TableTitles = (props) => {
  const keys = Object.keys(props.data[0]);

  return (
    <>
      <TableTitleWrapper>
        {keys.map((title, index) => (
          <BookingTitle key={index}>{title.replace("_", " ")}</BookingTitle>
        ))}
      </TableTitleWrapper>
    </>
  );
};

const ContentWrapper = styled(TableTitleWrapper)`
  text-transform: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-bottom: 0;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  transition: all 250ms ease-out;
  align-items: center;
  position: relative;
  padding: 10px 0;

  &:hover {
    box-shadow: 0px 4px 30px #0000001a;
    transform: scale(1.015);
  }
`;

const InfoWrap = styled.div`
  width: 130px;
  text-align: left;
`;

const MainInfoWrap = styled(InfoWrap)`
  display: flex;
  gap: 3px;
  flex-direction: column;
  text-align: left;
`;

const FullNameGuest = styled.p`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
`;

const BookingId = styled(Link)`
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
`;

const OrderDate = styled(FullNameGuest)``;

const CheckIn = styled(FullNameGuest)`
  font: normal normal 500 16px/25px Poppins;
`;

const CheckOut = styled(CheckIn)``;

const SpecialRequestButton = styled.button`
  background: #eef9f2;
  border-radius: 12px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #135846;
  padding: 13px 10px;
  transition: all 150ms ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    background: #5ad07a;
    color: #eef9f2;
  }
`;

const RoomType = styled(CheckIn)`
  font: normal normal 400 16px/25px Poppins;
  text-align: left;
`;

const StatusDiv = styled.div`
  font: normal normal 500 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 26px;
`;

const TrashIcon = styled(BsTrash3)`
  font-size: 20px;
  position: absolute;
  top: 27.5px;
  right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const FloatCross = styled(CrossIcon)`
  top: 10px;
  right: 10px;
`;

const NoteContainer = styled(ModalContainer)`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoteBackground = styled(ModalBackground)`
  background-color: rgba(0, 0, 0, 0.2);
`;

export const TableContent = (props) => {
  const bookings = props.data;

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleOpenNote = (commentId) => {
    setSelectedNoteId(commentId);
    setIsNoteOpen(true);
  };
  const Modal = ({ commentId, onCloseNote }) => {
    const selectedNote = bookings.find(
      (booking) => booking.guest.id_reserva === commentId
    );
    return (
      <NoteBackground>
        <NoteContainer>
          <FloatCross onClick={onCloseNote} />
          {selectedNote.special_request}
        </NoteContainer>
      </NoteBackground>
    );
  };

  return (
    <>
      <ContentWrapper>
        {bookings.map((booking) => (
          <RowWrapper key={booking.guest.id_reserva}>
            <MainInfoWrap>
              <FullNameGuest>
                {booking.guest.nombre} {booking.guest.apellidos}
              </FullNameGuest>
              <BookingId to={`/bookings/${booking.guest.id_reserva}`}>
                {booking.guest.id_reserva}
              </BookingId>
            </MainInfoWrap>
            <InfoWrap>
              <OrderDate>{booking.order_date}</OrderDate>
            </InfoWrap>
            <InfoWrap>
              <CheckIn>{booking.check_in}</CheckIn>
            </InfoWrap>
            <InfoWrap>
              <CheckOut>{booking.check_out}</CheckOut>
            </InfoWrap>
            <InfoWrap>
              <SpecialRequestButton
                onClick={() => handleOpenNote(booking.guest.id_reserva)}
              >
                View Notes
              </SpecialRequestButton>
            </InfoWrap>
            <InfoWrap>
              <RoomType>
                {booking.room.room_type} - {booking.room.room_number}
              </RoomType>
            </InfoWrap>
            <InfoWrap>
              <StatusDiv
                style={{
                  backgroundColor:
                    booking.status === "Check In"
                      ? "#e8ffee"
                      : booking.status === "Check Out"
                      ? "#FFEDEC"
                      : "#FEFFC2",
                  color:
                    booking.status === "Check In"
                      ? "#5ad07a"
                      : booking.status === "Check Out"
                      ? "#E23428"
                      : "#E2B308",
                }}
              >
                {booking.status}
              </StatusDiv>
            </InfoWrap>
            <TrashIcon />
          </RowWrapper>
        ))}
      </ContentWrapper>
      {isNoteOpen && (
        <Modal
          commentId={selectedNoteId}
          onCloseNote={() => setIsNoteOpen(false)}
        />
      )}
    </>
  );
};
