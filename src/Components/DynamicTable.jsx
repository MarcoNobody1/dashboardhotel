import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteData, get1Data } from "../features/Bookings/bookingThunks";
import {
  CrossIcon,
  Floater,
  formatDate,
} from "../GeneralComponents";
import { BsTrash3 } from "react-icons/bs";
import { LineWave } from "react-loader-spinner";
import { deleteRoomsData } from "../features/Rooms/roomThunks";
import { StatusDiv } from "./StatusDiv";
import { bookingDeleteStatus } from "../features/Bookings/bookingSlice";
import { roomdeleteStatus } from "../features/Rooms/roomSlice";
import { contactdeleteStatus } from "../features/Contact/contactSlice";

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

const contactTitles = ["Date", "Customer", "Subject", "Comment", "Archived"];

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Th = styled.th`
  background-color: #ffffff;
  text-align: left;
  padding: 8px;
  text-transform: capitalize;
  border-bottom: 2px solid #f5f5f5;
  width: ${(props) =>
    props.header === "amenities" || props.header === "comment"
      ? "480px"
      : props.header === "availability"
      ? "200px"
      : props.header === "customer"
      ? "300px"
      : "130px"};
`;

const Tr = styled.tr`
  transition: all 200ms ease-out;
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

const NoteContainer = styled.td`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 30px;
  transition: all 250ms ease-in-out;
  min-width: 480px;
  max-width: 500px;
  position: relative;
  z-index: 100;
`;

const NoteBackground = styled.tr`
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

const InfoLine = styled.p`
  font: normal normal 400 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
`;

const StatusButton = styled.button`
  font: normal normal 600 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 13px;
  text-align: center;
  text-transform: capitalize;
  border: none;
  transition: all 150ms ease-out;
  &:hover {
    cursor: pointer;
    filter: invert(0.2);
  }
`;

const DynamicTable = ({ data, dataType }) => {
  const dispatch = useDispatch();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const statusInfo = useSelector(
    dataType === "bookings"
      ? bookingDeleteStatus
      : dataType === "rooms"
      ? roomdeleteStatus
      : dataType === "contacts"
      ? contactdeleteStatus
      : null
  );

  const headers =
    data.length > 0
      ? Object.keys(data[0])
      : dataType === "bookings"
      ? bookingTitles
      : dataType === "rooms"
      ? roomTitles
      : dataType === "contacts"
      ? contactTitles
      : [];

  const handleGetDetails = (id) => {
    dispatch(get1Data(id));
  };

  const handleOpenNote = (commentId) => {
    setSelectedNoteId(commentId);
    setIsNoteOpen(true);
  };

  const handleDelete = (id) => {
    if (dataType === "bookings") {
      dispatch(deleteData(id));
    } else if (dataType === "rooms") {
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
          statusInfo === "fulfilled" ? (
            <TrashIcon onClick={() => handleDelete(rowData.guest.id_reserva)} />
          ) : statusInfo === "rejected" ? (
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
          statusInfo === "fulfilled" ? (
            <TrashIcon onClick={() => handleDelete(rowData.room_name.id)} />
          ) : statusInfo === "rejected" ? (
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

      case "date":
        return <>{formatDate(rowData.date.send_date)}</>;

      case "customer":
        return (
          <InfoWrap style={{ minWidth: "300px" }}>
            <InfoLine>{rowData.customer.name}</InfoLine>
            <InfoLine>{rowData.customer.email}</InfoLine>
            <InfoLine>{rowData.customer.phone}</InfoLine>
          </InfoWrap>
        );

      case "subject":
        return (
          <InfoWrap style={{ fontWeight: 600 }}>{rowData.subject}</InfoWrap>
        );

      case "archived":
        return (
          <StatusButton
            style={{
              backgroundColor: rowData.archived ? "#e8ffee" : "#FFEDEC",
              color: rowData.archived ? "#5ad07a" : "#E23428",
              maxWidth: "130px",
            }}
          >
            {rowData.archived ? "Archived" : "Not Archived"}
          </StatusButton>
        );
      default:
        return rowData[header];
    }
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
      <Tbody>
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
      </Tbody>
    </Table>
  );
};

export default DynamicTable;
