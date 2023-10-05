import { useDispatch, useSelector } from "react-redux";
import { deleteStatus } from "../../features/Bookings/bookingSlice";
import { useEffect, useState } from "react";
import { deleteData, get1Data } from "../../features/Bookings/bookingThunks";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  CheckIn,
  ContentWrapper,
  CrossIcon,
  FullNameGuest,
  InfoWrap,
  ModalBackground,
  ModalContainer,
  OrderDate,
  RowWrapper,
  StatusDiv,
  TrashIcon,
} from "../../GeneralComponents";
import { Floater } from "../../Bookings/Bookings";
import { LineWave } from "react-loader-spinner";

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

const CheckOut = styled(CheckIn)``;

const SpecialRequestButton = styled.button`
  background: #eef9f2;
  border-radius: 12px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #135846;
  padding: 13px 10px;
  transition: all 150ms ease-out;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    background: #5ad07a;
    color: #eef9f2;
  }
`;

const RoomType = styled(CheckIn)`
  font: normal normal 400 14px/25px Poppins;
  text-align: left;
`;

const BookingId = styled(Link)`
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
`;

const MainInfoWrap = styled(InfoWrap)`
  display: flex;
  gap: 3px;
  flex-direction: column;
`;

export const TableContent = (props) => {
  const bookings = props.data;
  const dispatch = useDispatch();
  const statusInfo = useSelector(deleteStatus);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    if (statusInfo === "rejected") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "pending") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "fulfilled") {
      setCurrentStatus(statusInfo);
    }
  }, [statusInfo]);

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const handleOpenNote = (commentId) => {
    setSelectedNoteId(commentId);
    setIsNoteOpen(true);
  };

  const handleGetDetails = (id) => {
    dispatch(get1Data(id));
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
              <BookingId
                onClick={() => handleGetDetails(booking.guest.id_reserva)}
                to={`/bookings/${booking.guest.id_reserva}`}
              >
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
            {currentStatus === "fulfilled" ? (
              <TrashIcon
                onClick={() => handleDelete(booking.guest.id_reserva)}
              />
            ) : currentStatus === "rejected" ? (
              alert("not good")
            ) : (
              <Floater>
                <LineWave
                  height="80"
                  width="80"
                  color=""
                  ariaLabel="line-wave"
                  wrapperStyle=""
                  wrapperClass=""
                  visible={true}
                  firstLineColor="#113C30"
                  middleLineColor="#517A6F"
                  lastLineColor="#E3342C"
                />
              </Floater>
            )}
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
