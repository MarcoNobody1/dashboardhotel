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
import { StatusDiv } from "./StatusDiv";

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
  "Availability",
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
  width: ${(props) =>
    props.header === "amenities"
      ? "480px"
      : props.header === "availability"
      ? "200px"
      : "130px"};
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

  const cellRenderer = (header, rowData) => {
    switch (header) {
      case "guest":
        const guest = rowData.guest;
        return (
          <>
            <div style={{ fontWeight: 600 }}>
              {guest.nombre} {guest.apellidos}
            </div>
            <StyledLink
              onClick={() => handleGetDetails(guest.id_reserva)}
              to={`/bookings/${guest.id_reserva}`}
            >
              {guest.id_reserva}
            </StyledLink>
          </>
        );

      case "special_request":
        return (
          <SpecialRequestButton
            onClick={() => handleOpenNote(rowData.guest.id_reserva)}
          >
            Special Request
          </SpecialRequestButton>
        );

      case "room":
        return `${rowData.room.room_type} - ${rowData.room.room_number}`;

      case "status":
        const trashIcon =
          currentStatus === "fulfilled" ? (
            <TrashIcon onClick={() => handleDelete(rowData.guest.id_reserva)} />
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
          );
        return (
          <>
            <StatusDiv data={rowData} />
            {trashIcon}
          </>
        );

      case "availability":
        const availabilityTrashIcon =
          currentRoomDeleteStatus === "fulfilled" ? (
            <TrashIcon onClick={() => handleDelete(rowData.room_name.id)} />
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
          );
        return (
          <>
            <StatusDiv data={rowData} />
            {availabilityTrashIcon}
          </>
        );

      case "offer_price":
        return (
          <InfoWrap
            style={{
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {rowData.offer_price.isOffer &&
              "$" +
                (rowData.price -
                  (rowData.price * rowData.offer_price.discount) / 100)}
          </InfoWrap>
        );

      case "price":
        return (
          <InfoWrap
            style={{
              color: rowData.offer_price.isOffer ? "#b2b2b2" : "",
              textDecoration: rowData.offer_price.isOffer ? "line-through" : "",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {`$${rowData[header]}`}
          </InfoWrap>
        );

      case "amenities":
        return rowData.amenities.join(", ");

      case "room_name":
        return (
          <RoomPhotoWrap>
            <ImageRoom src={rowData.room_name.room_photo} />
            <PhotoSpecs>
              <PhotoId
                to={`/rooms/${rowData.room_name.id}`}
                onClick={() => handleGetDetails(rowData.room_name.id)}
              >
                {rowData.room_name.id}
              </PhotoId>
              <PhotoRoomSpec>{rowData.room_name.room_number}</PhotoRoomSpec>
            </PhotoSpecs>
          </RoomPhotoWrap>
        );

      default:
        return rowData[header];
    }
  };

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
            <Th key={header} header={header}>
              {header.replace(/_/g, " ")}
            </Th>
          ))}
        </TrNotHover>
      </Thead>
      <tbody>
        {data.map((rowData, index) => (
          <Tr key={index}>
            {headers.map((header) => (
              <Td key={header}>{cellRenderer(header, rowData)}</Td>
            ))}
          </Tr>
        ))}
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
