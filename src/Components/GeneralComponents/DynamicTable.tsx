import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteData, get1Data } from "../../features/Bookings/bookingThunks";
import { AdNewContainer, CommentWrapper, CrossIcon, Floater, NewDataTitle, UpdatingTitle, formatDate } from "./GeneralComponents";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";
import { ColorRing, LineWave } from "react-loader-spinner";
import { deleteRoomsData, get1RoomData } from "../../features/Rooms/roomThunks";
import { StatusDiv } from "./StatusDiv";
import { bookingDeleteStatus } from "../../features/Bookings/bookingSlice";
import { roomUpdateStatus, roomdeleteStatus } from "../../features/Rooms/roomSlice";
import {
  archiveStatus,
  contactdeleteStatus,
} from "../../features/Contact/contactSlice";
import { archiveData, deleteContactsData } from "../../features/Contact/contactThunks";
import Swal from "sweetalert2";
import { userDeleteStatus, userUpdateStatus } from "../../features/Users/userSlice";
import { deleteUsersData, updateUserData } from '../../features/Users/userThunks';
import { BsTelephoneInbound } from "react-icons/bs";
import { BookingInterface, ContactInterface, RoomInterface, UserInterface } from "../../features/Interfaces/Interfaces";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserEditorCreator } from "../Users/UserEditorCreator";
import { RoomeEditorCreator } from "../Rooms/RoomEditorCreator";

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

const userTitles = [
  "name",
  "start_date",
  "job_description",
  "contact",
  "status",
];

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

interface ThProps {
  header: string;
}

const Th = styled.th<ThProps>`
  background-color: #ffffff;
  text-align: left;
  padding: 8px;
  text-transform: capitalize;
  border-bottom: 2px solid #f5f5f5;
  width: ${(props) =>
    props.header === "amenities"
      ? "480px"
      : props.header === "availability" || props.header === "activity"
        ? "200px"
        : props.header === "customer"
          ? "300px"
          : props.header === "job_description"
            ? "500px"
            : props.header === "comment"
              ? "350px"
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

const NoteContainer = styled.td`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #135846;
  border-radius: 20px;
  padding: 30px;
  transition: all 250ms ease-in-out;
  min-width: 480px;
  max-width: 900px;
  position: relative;
  z-index: 100;
`;

const SpecialRequest = styled.p`
font-size: 14px;
font-style: italic;
max-width: 400px;
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

const EditIcon = styled(BsPencilSquare)`
 font-size: 20px;
  position: absolute;
  top: 60%;
  right: 10px;
  color:#517A6F;

  &:hover {
    cursor: pointer;
  }
`;

interface TrashProps {
  datatype?: string
}

const TrashIcon = styled(BsTrash3) <TrashProps>`
  font-size: 20px;
  position: absolute;
  top: ${(props) => (props.datatype === "contact" ? "40%" : props.datatype === "bookings" ? "35%" : "20%")};
  right: ${(props) => (props.datatype === "bookings" ? "6%" : "10px")};
  color: #E3342C;

  &:hover {
    cursor: pointer;
  }
`;

const RoomPhotoWrap = styled.div`
  flex-direction: row;
  display: flex;
  gap: 15px;
  min-width: 300px;
`;

const UserDataWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ImageRoom = styled.img`
  width: 150px;
  height: 70px;
  background-color: #747474;
`;

const UserImage = styled.img`
  width: 70px;
  height: 70px;
  background: transparent;
`;

const DataSpecs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DataId = styled(Link)`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
  text-transform: uppercase;
  &::before {
    font-size: 12px;
    content: "#";
  }
`;

const UserId = styled.p`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
  text-transform: uppercase;
  &::before {
    font-size: 12px;
    content: "#";
  }
`;

const UserEmployee = styled.p`
font: normal normal 400 12px/21px Poppins;
  letter-spacing: 0px;
  color: #E3342C;
  text-transform: uppercase;
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

const UserName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #393939;
`;

const UserJob = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #393939;
  font-style: italic;
`;

const UserLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #393939;
  text-decoration: none;
  transition: all 200ms ease-in-out;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    text-decoration: underline;
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
  position: relative;
  min-height: 51px;
  min-width: 118px;
  transition: all 150ms ease-out;
  &:hover {
    cursor: pointer;
    filter: invert(0.2);
  }
`;

const CenterDiv = styled.div`
  height: 51px;
  width: 118px;
  position: absolute;
  top: 5px;
  left: 0;
`;

const SimpleDiv = styled.div`
font-weight: 600;
`;

interface DynamicTableProps {
  data: Object[] | BookingInterface[] | RoomInterface[] | ContactInterface[] | UserInterface[];
  dataType: string;
}

interface ModalProps {
  commentId: string;
  onCloseNote: () => void;
}

interface UserEditorProps {
  userId: string;
  onCloseUserEditor: () => void;
}

interface RoomEditorProps {
  roomId: string;
  onCloseRoomEditor: () => void;
}

const DynamicTable: FC<DynamicTableProps> = ({ data, dataType }) => {
  const dispatch = useAppDispatch();
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");
  const [isNoteOpen, setIsNoteOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [isUserEditOpen, setIsUserEditOpen] = useState<boolean>(false);
  const [isRoomEditOpen, setIsRoomEditOpen] = useState<boolean>(false);
  const statusInfo = useAppSelector(
    dataType === "bookings"
      ? bookingDeleteStatus
      : dataType === "rooms"
        ? roomdeleteStatus
        : dataType === "contacts"
          ? contactdeleteStatus
          : userDeleteStatus
  );
  const archiveContactStatus = useAppSelector(archiveStatus);
  const editStatus = useAppSelector(
    dataType === "users"
      ? userUpdateStatus
      : roomUpdateStatus
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
            : userTitles;

  const handleGetDetails = (id: string) => {
    if (dataType === "bookings") {
      dispatch(get1Data(id));
    } else if (dataType === "rooms") {
      dispatch(get1RoomData(id));
    }
  };

  const handleOpenNote = (commentId: string) => {
    setSelectedNoteId(commentId);
    setIsNoteOpen(true);
  };

  const handleDelete = (id: string) => {
    if (dataType === "bookings") {
      dispatch(deleteData(id));
    } else if (dataType === "rooms") {
      dispatch(deleteRoomsData(id));
    } else if (dataType === "users") {
      dispatch(deleteUsersData(id));
    } else if (dataType === "contacts") {
      dispatch(deleteContactsData(id))
    }
  };

  const handleOpenModal = (id: string, dataType: string) => {
    if (dataType === "users") {
      setSelectedUser(id);
      setIsUserEditOpen(true);
    } else if (dataType === "rooms") {
      setSelectedRoom(id);
      setIsRoomEditOpen(true);
    }

  }

  const handleArchiveComment = (id: string, archived: boolean) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center-end",
      showConfirmButton: false,
      timer: archived ? 1500 : 1000,
      timerProgressBar: true,
    });

    dispatch(archiveData(id));
    if (archiveContactStatus === "fulfilled") {
      Toast.fire({
        icon: "success",
        title: archived ? "Comment Dearchived" : "Comment Archived",
        timerProgressBar: false,
      });
    }
  };

  type TableRow =
    | BookingInterface
    | RoomInterface
    | ContactInterface
    | UserInterface;

  type DataArray =
    | BookingInterface[]
    | RoomInterface[]
    | ContactInterface[]
    | UserInterface[];

  const Modal: FC<ModalProps> = ({ commentId, onCloseNote }) => {
    const selectedNote = (data as DataArray).find((booking: TableRow) => {
      if (dataType === "bookings" && (booking as BookingInterface).guest) {
        return (booking as BookingInterface).guest.id_reserva === commentId;
      } else {
        return false;
      }
    });
    return (
      <NoteBackground>
        <NoteContainer>
          <FloatCross onClick={onCloseNote} />
          {selectedNote && dataType === "bookings" && 'special_request' in (selectedNote as BookingInterface) ? (
            <SpecialRequest>  {(selectedNote as BookingInterface).special_request}</SpecialRequest>

          ) : (
            'Special request not found. Please, try again.'
          )}
        </NoteContainer>
      </NoteBackground>
    );
  };

  const UserEditor: FC<UserEditorProps> = ({ userId, onCloseUserEditor }) => {
    const selectedUser = (data as DataArray).find((user: TableRow) => {
      if (dataType === "users" && (user as UserInterface).name) {
        return (user as UserInterface).name.id === userId;
      } else {
        return false;
      }
    });
    return (
      <NoteBackground>
        <AdNewContainer>
          <FloatCross onClick={onCloseUserEditor} />
          {selectedUser && dataType === "users" ? (
            <>
              <UpdatingTitle>Updating #{(selectedUser as UserInterface).name.id}  User:</UpdatingTitle>
              <UserEditorCreator select={selectedUser as UserInterface} closeModal={onCloseUserEditor} />
            </>
          ) : (
            'Special request not found. Please, try again.'
          )}
        </AdNewContainer>
      </NoteBackground>
    );
  };

  const RoomEditor: FC<RoomEditorProps> = ({ roomId, onCloseRoomEditor }) => {
    const selectedRoom = (data as DataArray).find((room: TableRow) => {
      if (dataType === "rooms" && (room as RoomInterface).room_name) {
        return (room as RoomInterface).room_name.id === roomId;
      } else {
        return false;
      }
    });
    return (
      <NoteBackground>
        <AdNewContainer>
          <FloatCross onClick={onCloseRoomEditor} />
          {selectedRoom && dataType === "rooms" ? (
            <>
              <UpdatingTitle>Updating #{(selectedRoom as RoomInterface).room_name.id}  Room:</UpdatingTitle>
              <RoomeEditorCreator select={selectedRoom as RoomInterface} closeModal={onCloseRoomEditor} />
            </>
          ) : (
            'Special request not found. Please, try again.'
          )}
        </AdNewContainer>
      </NoteBackground>
    );
  };

  type Header = "guest" | "special_request" | "room" | "status" | "availability" | "offer_price" | "price" | "amenities" | "room_name" | "date" | "customer" | "subject" | "archived" | "name" | "activity" | "job_description" | "contact" | "comment";

  type RowData = {
    guest: {
      nombre: string;
      apellidos: string;
      id_reserva: string;
    };
    room: {
      room_type: string;
      room_number: string;
    };
    status: string;
    availability: string;
    offer_price: {
      isOffer: boolean;
      discount: number;
    };
    price: number;
    amenities: string[];
    room_name: {
      room_photo: string;
      id: string;
      room_number: string;
    };
    date: {
      send_date: string;
      id: string;
    };
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    subject: string;
    archived: boolean;
    name: {
      username: string;
      id: string;
      email: string;
      employee_position: string;
      photo: string;
    };
    activity: string;
    job_description: string;
    contact: string;
    comment: string;
  };

  const cellRenderer = (header: Header, rowData: RowData) => {
    switch (header) {
      case "guest":
        const guest = rowData.guest;
        return (
          <>
            <SimpleDiv>
              {guest.nombre} {guest.apellidos}
            </SimpleDiv>
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
            <TrashIcon datatype="bookings" onClick={() => handleDelete(rowData.guest.id_reserva)} />
          ) : statusInfo === "rejected" ? (
            <TrashIcon style={{ color: "#e9d7d7" }} />
          ) : (
            <Floater datatype="bookings">
              <LineWave
                height="80"
                width="80"
                color=""
                ariaLabel="line-wave"
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
            <Floater datatype="roomtrash">
              <LineWave
                height="60"
                width="60"
                color=""
                ariaLabel="line-wave"
                wrapperClass=""
                visible={true}
                firstLineColor="#113C30"
                middleLineColor="#517A6F"
                lastLineColor="#E3342C"
              />
            </Floater>
          );
        const EditRoomIcon =
          editStatus === "fulfilled" ? (
            <EditIcon onClick={() => handleOpenModal(rowData.room_name.id, dataType)} />
          ) : editStatus === "rejected" ? (
            <EditIcon style={{ color: "#e9d7d7" }} />
          ) : (
            <Floater datatype="rooms">
              <LineWave
                height="60"
                width="60"
                color=""
                ariaLabel="line-wave"
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
            {EditRoomIcon}
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
            <DataSpecs>
              <DataId
                to={`/rooms/${rowData.room_name.id}`}
                onClick={() => handleGetDetails(rowData.room_name.id)}
              >
                {rowData.room_name.id}
              </DataId>
              <PhotoRoomSpec>{rowData.room_name.room_number}</PhotoRoomSpec>
            </DataSpecs>
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
          <InfoWrap>{rowData.subject}</InfoWrap>
        );

      case "archived":

        const trashContactIcon =
          statusInfo === "fulfilled" ? (
            <TrashIcon datatype="contact" onClick={() => handleDelete(rowData.date.id)} />
          ) : statusInfo === "rejected" ? (
            <TrashIcon style={{ color: "#e9d7d7" }} />
          ) : (
            <Floater datatype="contacts">
              <LineWave
                height="80"
                width="80"
                ariaLabel="line-wave"
                visible={true}
                firstLineColor="#113C30"
                middleLineColor="#517A6F"
                lastLineColor="#E3342C"
              />
            </Floater>
          );
        const statusContact = () => {
          if (archiveContactStatus === "rejected") {
            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "error",
              title: "Somethin's wrong",
              timer: 1500,
              timerProgressBar: false,
              html: "<p>Please, try again...</p>",
            });
          } else if (archiveContactStatus === "pending") {
            return (
              <CenterDiv>
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#E3342C",
                    "#517A6F",
                    "#618D82",
                    "#6C7C7C",
                    "#113C30",
                  ]}
                />
              </CenterDiv>
            );
          } else {
            return rowData.archived ? "Archived" : "Not Archived";
          }
        };

        return (
          <>
            <StatusButton
              onClick={() =>
                handleArchiveComment(rowData.date.id, rowData.archived)
              }
              style={{
                backgroundColor: rowData.archived ? "#e8ffee" : "#FFEDEC",
                color: rowData.archived ? "#5ad07a" : "#E23428",
                maxWidth: "130px",
              }}
            >
              {statusContact()}
            </StatusButton>
            {trashContactIcon}
          </>
        );

      case "name":
        return (
          <UserDataWrap>
            <UserImage src={rowData.name.photo} />
            <DataSpecs>
              <UserName>{rowData.name.username}</UserName>
              <UserId>{rowData.name.id}</UserId>
              <UserLink href={`mailto:${rowData.name.email}`}>
                {rowData.name.email}
              </UserLink>
              <UserEmployee>{rowData.name.employee_position}</UserEmployee>
            </DataSpecs>
          </UserDataWrap>
        );

      case "activity":
        const trashUserIcon =
          statusInfo === "fulfilled" ? (
            <TrashIcon onClick={() => handleDelete(rowData.name.id)} />
          ) : statusInfo === "rejected" ? (
            <TrashIcon style={{ color: "#e9d7d7" }} />
          ) : (
            <Floater datatype="users">
              <LineWave
                height="80"
                width="80"
                color=""
                ariaLabel="line-wave"
                wrapperClass=""
                visible={true}
                firstLineColor="#113C30"
                middleLineColor="#517A6F"
                lastLineColor="#E3342C"
              />
            </Floater>
          );

        const EditUserIcon =
          editStatus === "fulfilled" ? (
            <EditIcon onClick={() => handleOpenModal(rowData.name.id, dataType)} />
          ) : editStatus === "rejected" ? (
            <EditIcon style={{ color: "#e9d7d7" }} />
          ) : (
            <Floater>
              <LineWave
                height="80"
                width="80"
                color=""
                ariaLabel="line-wave"
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
            {trashUserIcon}
            {EditUserIcon}
          </>
        );

      case "job_description":
        return <UserJob>{rowData.job_description}</UserJob>;
      case "contact":
        return (
          <UserDataWrap>
            <BsTelephoneInbound />
            <UserLink href={`tel:${rowData.contact}`}>
              {rowData.contact}
            </UserLink>
          </UserDataWrap>
        );
      case "comment":
        return (
          <>
            <CommentWrapper>{rowData.comment}</CommentWrapper>
          </>
        )

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
              <Td key={header as Header}>
                {headers.includes(header as Header) && cellRenderer(header as Header, rowData as RowData)}
              </Td>

            ))}
          </Tr>
        ))}
        {isNoteOpen && (
          <Modal
            commentId={selectedNoteId}
            onCloseNote={() => setIsNoteOpen(false)}
          />
        )}
        {isUserEditOpen && (
          <UserEditor
            userId={selectedUser}
            onCloseUserEditor={() => setIsUserEditOpen(false)}
          />
        )}
        {isRoomEditOpen && (
          <RoomEditor
            roomId={selectedRoom}
            onCloseRoomEditor={() => setIsRoomEditOpen(false)}
          />
        )}
      </Tbody>
    </Table>
  );
};

export default DynamicTable;
