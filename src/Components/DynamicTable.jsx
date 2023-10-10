import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteData, get1Data } from "../features/Bookings/bookingThunks";
import {
  CrossIcon,
  Floater,
  ModalBackground,
  ModalContainer,
} from "../GeneralComponents";
import { BsTrash3 } from "react-icons/bs";
import { deleteStatus } from "../features/Bookings/bookingSlice";
import { LineWave } from "react-loader-spinner";
import { deleteRoomsData } from "../features/Rooms/roomThunks";
import { roomdeleteStatus } from "../features/Rooms/roomSlice";

const bookingTitles = [
  "Guest",
  "Order Date",
  "Check In",
  "Check Out",
  "Special Request",
  "Room",
  "Status",
];

const roomTitles = [
  "Room Name",
  "Room Type",
  "Amenities",
  "Price",
  "Offer Price",
  "Status",
];

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead``;

const Th = styled.th`
  background-color: #ffffff;
  text-align: left;
  padding: 8px;
  text-transform: capitalize;
  border-bottom: 2px solid #f5f5f5;
`;

const Tr = styled.tr`
  transition: all 250ms ease-out;
  background-color: #ffffff;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 4px 30px #0000001a;
  }
`;

const TrNotHover = styled.tr`
  background-color: #ffffff;
`;

const Td = styled.td`
  padding: 8px;
  position: relative;
`;

const StyledLink = styled(Link)`
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
`;

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

const StatusDiv = styled.div`
  font: normal normal 500 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 26px;
  text-align: center;
  text-transform: capitalize;
  width: 70%;
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

const FloatCross = styled(CrossIcon)`
  top: 10px;
  right: 10px;
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

const RoomPhotoWrap = styled.div`
  flex-direction: row;
  display: flex;
  gap: 15px;
  flex-direction: row;
  min-width: 300px;
`;

const ImageRoom = styled.img`
  width: 150px;
  height: 70px;
  background-color: #747474;
`;

const PhotoSpecs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PhotoId = styled(Link)`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
  &::before {
    font-size: 12px;
    content: "#";
  }
`;

const PhotoRoomSpec = styled.p`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
  text-align: left;
  &::before {
    font-size: 12px;
    content: "Nº ";
  }
`;

const InfoWrap = styled.div`
  width: 130px;
  text-align: left;
  font-weight: 600;
  font-size: 18px;
`;

const DynamicTable = ({ data, dataType }) => {
  const dispatch = useDispatch();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentRoomDeleteStatus, setCurrentRoomDeleteStatus] = useState("");
  const statusInfo = useSelector(deleteStatus);
  const roomDeleteStatusInfo = useSelector(roomdeleteStatus);
  console.log(dataType);

  const isBookings = dataType === "bookings";
  const isRooms = dataType === "rooms";

  useEffect(() => {
    if (
      statusInfo === "rejected" ||
      statusInfo === "pending" ||
      statusInfo === "fulfilled"
    ) {
      setCurrentStatus(statusInfo);
    }
  }, [statusInfo]);

  useEffect(() => {
    if (
      roomDeleteStatusInfo === "rejected" ||
      roomDeleteStatusInfo === "pending" ||
      roomDeleteStatusInfo === "fulfilled"
    ) {
      setCurrentRoomDeleteStatus(roomDeleteStatusInfo);
    }
  }, [roomDeleteStatusInfo]);

  const headers =
    data.length > 0
      ? Object.keys(data[0])
      : isBookings
      ? bookingTitles
      : isRooms
      ? roomTitles
      : [];

  const handleGetDetails = (id) => {
    dispatch(get1Data(id));
  };

  const handleOpenNote = (commentId) => {
    setSelectedNoteId(commentId);
    setIsNoteOpen(true);
  };

  const handleDelete = (id) => {
    if (isBookings) {
      dispatch(deleteData(id));
    } else if (isRooms) {
      dispatch(deleteRoomsData(id));
    }
  };

  const Modal = ({ commentId, onCloseNote }) => {
    const selectedNote = data.find(
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
    <Table>
      <Thead>
        <TrNotHover>
          {headers.map((header) => (
            <Th key={header}>{header.replace(/_/g, " ")}</Th>
          ))}
        </TrNotHover>
      </Thead>
      <tbody>
        {isBookings ? (
          data.map((booking, index) => (
            <Tr key={index}>
              {headers.map((header) => (
                <Td key={header}>
                  {header === "guest" ? (
                    <>
                      <div style={{ fontWeight: 600 }}>
                        {booking.guest.nombre} {booking.guest.apellidos}
                      </div>
                      <StyledLink
                        onClick={() =>
                          handleGetDetails(booking.guest.id_reserva)
                        }
                        to={`/bookings/${booking.guest.id_reserva}`}
                      >
                        {booking.guest.id_reserva}
                      </StyledLink>
                    </>
                  ) : header === "special_request" ? (
                    <SpecialRequestButton
                      onClick={() => handleOpenNote(booking.guest.id_reserva)}
                    >
                      Special Request
                    </SpecialRequestButton>
                  ) : header === "room" ? (
                    <>
                      {booking.room.room_type} - {booking.room.room_number}
                    </>
                  ) : header === "status" ? (
                    <>
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
                      {currentStatus === "fulfilled" ? (
                        <TrashIcon
                          onClick={() => handleDelete(booking.guest.id_reserva)}
                        />
                      ) : currentStatus === "rejected" ? (
                        <TrashIcon style={{ color: "#e9d7d7" }} />
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
                    </>
                  ) : (
                    booking[header]
                  )}
                </Td>
              ))}
            </Tr>
          ))
        ) : isRooms ? (
          data.map((room, index) => (
            <Tr key={index}>
              {headers.map((header) => (
                <Td
                  key={header}
                  style={
                    header === "price"
                      ? {
                          color: room.offer_price.isOffer ? "#b2b2b2" : "",
                          textDecoration: room.offer_price.isOffer
                            ? "line-through"
                            : "",
                          fontWeight: 600,
                          fontSize: "18px",
                        }
                      : {
                          width:
                            header === "amenities"
                              ? "480px"
                              : header === "status"
                              ? "200px"
                              : "130px",
                        }
                  }
                >
                  {header === "room_name" ? (
                    <RoomPhotoWrap>
                      <ImageRoom src={room.room_name.room_photo} />
                      <PhotoSpecs>
                        <PhotoId
                          to={`/rooms/${room.room_name.id}`}
                          onClick={() => handleGetDetails(room.room_name.id)}
                        >
                          {room.room_name.id}
                        </PhotoId>
                        <PhotoRoomSpec>
                          {room.room_name.room_number}
                        </PhotoRoomSpec>
                      </PhotoSpecs>
                    </RoomPhotoWrap>
                  ) : header === "status" ? (
                    <>
                      <StatusDiv
                        style={{
                          backgroundColor:
                            room.status === "available" ? "#e8ffee" : "#FFEDEC",
                          color:
                            room.status === "available" ? "#5ad07a" : "#E23428",
                          maxWidth: "130px",
                        }}
                      >
                        {room.status}
                      </StatusDiv>
                      {currentRoomDeleteStatus === "fulfilled" ? (
                        <TrashIcon
                          onClick={() => handleDelete(room.room_name.id)}
                        />
                      ) : currentRoomDeleteStatus === "rejected" ? (
                        <TrashIcon style={{ color: "#e9d7d7" }} />
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
                    </>
                  ) : header === "offer_price" ? (
                    <InfoWrap>
                      {room.offer_price.isOffer &&
                        "$" +
                          (room.price -
                            (room.price * room.offer_price.discount) / 100)}
                    </InfoWrap>
                  ) : (
                    room[header]
                  )}
                </Td>
              ))}
            </Tr>
          ))
        ) : (
          <div>I dunno...</div>
        )}
        {isNoteOpen && (
          <Modal
            commentId={selectedNoteId}
            onCloseNote={() => setIsNoteOpen(false)}
          />
        )}
      </tbody>
    </Table>
  );
};

export default DynamicTable;
