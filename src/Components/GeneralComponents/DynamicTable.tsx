import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteData, get1Data } from "../../features/Bookings/bookingThunks";
import {
  AdNewContainer,
  CommentWrapper,
  CrossIcon,
  Floater,
  UpdatingTitle,
  formatDate,
} from "./GeneralComponents";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";
import { ColorRing, LineWave } from "react-loader-spinner";
import { deleteRoomsData, get1RoomData } from "../../features/Rooms/roomThunks";
import { StatusDiv } from "./StatusDiv";
import { bookingDeleteStatus } from "../../features/Bookings/bookingSlice";
import {
  roomUpdateStatus,
  roomdeleteStatus,
} from "../../features/Rooms/roomSlice";
import {
  archiveStatus,
  contactdeleteStatus,
} from "../../features/Contact/contactSlice";
import {
  archiveData,
  deleteContactsData,
} from "../../features/Contact/contactThunks";
import Swal from "sweetalert2";
import {
  userDeleteStatus,
  userUpdateStatus,
} from "../../features/Users/userSlice";
import {
  deleteUsersData,
  updateUserData,
} from "../../features/Users/userThunks";
import { BsTelephoneInbound } from "react-icons/bs";
import {
  BookingInterface,
  ContactInterface,
  DarkProp,
  RoomInterface,
  UserInterface,
} from "../../features/Interfaces/Interfaces";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserEditorCreator } from "../Users/UserEditorCreator";
import { RoomeEditorCreator } from "../Rooms/RoomEditorCreator";
import { ThemeContext } from "../../Context/ToggleTheme";
import { useContext } from "react";
import { format } from "date-fns";

const bookingTitles = [
  "guest",
  "order_date",
  "check_in",
  "check_out",
  "special_request",
  "room",
  "status",
];

const roomTitles = [
  "room_name",
  "room_type",
  "amenities",
  "price",
  "offer_price",
  "availability",
];

const contactTitles = ["date", "customer", "subject", "comment", "archived"];

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
  transition: all 250ms ease-in-out;
`;

const Thead = styled.thead`
  transition: all 250ms ease-in-out;
`;

const Tbody = styled.tbody`
  transition: all 250ms ease-in-out;
`;

interface ThProps {
  header: string;
  dark?: boolean;
}

const Th = styled.th<ThProps>`
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  color: ${(props) => (props.dark ? "#FFF" : "#202020")};
  text-align: left;
  padding: 8px;
  text-transform: capitalize;
  border-bottom: 2px solid #f5f5f5;
  transition: all 250ms ease-in-out;
  width: ${(props) =>
    props.header === "amenities"
      ? "480px"
      : props.header === "availability" ||
        props.header === "activity" ||
        props.header === "room_type" ||
        props.header === "subject" ||
        props.header === "start_date"
      ? "200px"
      : props.header === "customer" || props.header === "job_description"
      ? "300px"
      : props.header === "comment"
      ? "350px"
      : "130px"};
`;

const Tr = styled.tr<DarkProp>`
  transition: all 250ms ease-in-out;
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};

  &:hover {
    transform: scale(1.02);
    box-shadow: ${(props) =>
      props.dark ? "0px 4px 30px #8f89891a" : "0px 4px 30px #0000001a"};
  }
`;

const TrNotHover = styled.tr`
  background-color: #ffffff;
  transition: all 250ms ease-in-out;
`;

const Td = styled.td`
  padding: 8px;
  position: relative;
  transition: all 250ms ease-in-out;
`;

const StyledLink = styled(Link)<DarkProp>`
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark === "true" ? "#FFF" : "#799283")};
  transition: all 250ms ease-in-out;
`;

const SpecialRequestButton = styled.button<DarkProp>`
  background: ${(props) => (props.dark ? "#144638" : "#eef9f2")};
  border-radius: 12px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#eef9f2" : "#144638")};
  padding: 13px 10px;
  transition: all 150ms ease-in-out;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    background: ${(props) => (props.dark ? "#41ebbd" : "#5ad07a")};
    color: ${(props) => (props.dark ? "#202020" : "#eef9f2")};
  }
`;

const NoteContainer = styled.td<DarkProp>`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.dark ? "#202020" : "#fff")};
  border: ${(props) =>
    props.dark ? "1px solid #41ebbd" : "1px solid #135846"};
  color: ${(props) => (props.dark ? "#eef9f2" : "#202020")};
  border-radius: 20px;
  padding: 30px;
  transition: all 250ms ease-in-out;
  min-width: 480px;
  max-width: 900px;
  position: relative;
  z-index: 100;
`;

const SpecialRequest = styled.p`
  font-size: 18px;
  font-style: italic;
  max-width: 500px;
  line-height: 35px;
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

const EditIcon = styled(BsPencilSquare)<DarkProp>`
  font-size: 20px;
  position: absolute;
  top: 60%;
  right: 10px;
  color: ${(props) => (props.dark === "true" ? "#41ebbd" : "#517A6F")};
  transition: all 250ms ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

interface TrashProps {
  datatype?: string;
}

const TrashIcon = styled(BsTrash3)<TrashProps>`
  font-size: 20px;
  position: absolute;
  top: ${(props) =>
    props.datatype === "contact"
      ? "40%"
      : props.datatype === "bookings"
      ? "35%"
      : "20%"};
  right: ${(props) => (props.datatype === "bookings" ? "6%" : "10px")};
  color: #e3342c;

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
  max-width: 400px;
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

const DataId = styled(Link)<DarkProp>`
  font: normal normal 600 10px/16px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark === "true" ? "#202020" : "#fff")};
  text-decoration: none;
  background-color: ${(props) =>
    props.dark === "true" ? "#41ebbd" : "#135846"};
  border-radius: 5px;
  max-width: 65px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 500ms ease-in-out;

  &:hover {
    max-width: 120px;
  }

  &::before {
    font-size: 12px;
    content: "⤷ Go to #";
  }
`;

const UserId = styled.p<DarkProp>`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#2e6e5d" : "#799283")};
  transition: all 250ms ease-in-out;
  text-transform: uppercase;
  &::before {
    font-size: 12px;
    content: "#";
  }
`;

const UserEmployee = styled.p`
  font: normal normal 400 12px/21px Poppins;
  letter-spacing: 0px;
  color: #e3342c;
  text-transform: uppercase;
`;

const PhotoRoomSpec = styled.p<DarkProp>`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#393939")};
  text-align: left;
  transition: all 250ms ease-in-out;
  &::before {
    font-size: 12px;
    content: "Nº ";
  }
`;

const UserName = styled.p<DarkProp>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.dark ? "#eef9f2" : "#393939")};
  transition: all 250ms ease-in-out;
`;

const UserJob = styled.p<DarkProp>`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => (props.dark ? "#41ebbd" : "#393939")};
  transition: all 250ms ease-in-out;
  font-style: italic;
`;

const UserLink = styled.a<DarkProp>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.dark ? "#41ebbd" : "#393939")};
  transition: all 250ms ease-in-out;
  text-decoration: none;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    text-decoration: underline;
  }
`;

const InfoWrap = styled.div<DarkProp>`
  width: 130px;
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#393939")};
  transition: all 250ms ease-in-out;
`;

const SubjectWrapper = styled.div<DarkProp>`
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#393939")};
  transition: all 250ms ease-in-out;
`;

const InfoLine = styled.p`
  font: normal normal 400 16px/25px Poppins;
  letter-spacing: 0px;
  color: inherit;
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
  transition: all 250ms ease-in-out;
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

const SimpleDiv = styled.div<DarkProp>`
  transition: all 250ms ease-in-out;
  font-weight: 600;
  color: ${(props) => (props.dark ? "#41ebbd" : "#202020")};
`;

const SampleDiv = styled.div<DarkProp>`
  transition: all 250ms ease-in-out;
  color: ${(props) => (props.dark ? "#41ebbd" : "#202020")};
`;

const AmenitiesDiv = styled(SampleDiv)<DarkProp>`
  overflow-x: scroll;
  max-width: 300px;
  display: flex;
  padding: 10px;

  &::-webkit-scrollbar {
    height: 6px;
    transition: all 0.25s ease-in-out;
    background-color: ${(props) => (props.dark ? "#202020" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => (props.dark ? "#eef9f2" : "#888")};
    transition: all 0.25s ease-in-out;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-corner {
    border-radius: 15px;
  }
`;

interface FadeProps {
  dark?: boolean | string;
  right?: boolean;
}

const FadeDiv = styled.div<FadeProps>`
  position: absolute;
  border-radius: 15px;
  right: ${(props) => (props.right ? "130px" : undefined)};
  left: ${(props) => (props.right ? undefined : "0px")};
  top: 10px;
  width: 40px;
  height: 55px;
  transition: all 250ms ease-in-out;
  background: ${(props) =>
    props.dark
      ? props.right
        ? "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgba(32, 32, 32, 1) 70%)"
        : "linear-gradient(90deg, rgba(32,32,32,1) 30%, rgba(255,255,255,0) 60%)"
      : props.right
      ? "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 1) 70%)"
      : "linear-gradient(90deg, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 60%)"};
`;

const DateDiv = styled(SampleDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AmenityWrapper = styled.div`
  background: #e8f2ef;
  border-radius: 8px;
  padding: 5px;
  margin: 3px;
  color: #135846;
  text-align: center;
  display: flex;
  align-items: center;
`;

const AmenityContent = styled.p`
  font: normal normal 500 12px/21px Poppins;
  letter-spacing: 0px;
  color: inherit;
  width: max-content;
`;

interface DynamicTableProps {
  data:
    | Object[]
    | BookingInterface[]
    | RoomInterface[]
    | ContactInterface[]
    | UserInterface[];
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
    dataType === "users" ? userUpdateStatus : roomUpdateStatus
  );
  const { dark } = useContext(ThemeContext);

  const headers =
    dataType === "bookings"
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
      dispatch(deleteContactsData(id));
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
  };

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
      if (dataType === "bookings" && (booking as BookingInterface)) {
        return (booking as BookingInterface)._id.$oid === commentId;
      } else {
        return false;
      }
    });
    return (
      <NoteBackground>
        <NoteContainer dark={dark.dark}>
          <FloatCross onClick={onCloseNote} />
          {selectedNote &&
          dataType === "bookings" &&
          "special_request" in (selectedNote as BookingInterface) ? (
            <SpecialRequest>
              {(selectedNote as BookingInterface).special_request}
            </SpecialRequest>
          ) : (
            "Special request not found. Please, try again."
          )}
        </NoteContainer>
      </NoteBackground>
    );
  };

  const UserEditor: FC<UserEditorProps> = ({ userId, onCloseUserEditor }) => {
    const selectedUser = (data as DataArray).find((user: TableRow) => {
      if (dataType === "users" && (user as UserInterface)) {
        return (user as UserInterface)._id.$oid === userId;
      } else {
        return false;
      }
    });
    return (
      <NoteBackground>
        <AdNewContainer dark={dark.dark}>
          <FloatCross onClick={onCloseUserEditor} />
          {selectedUser && dataType === "users" ? (
            <>
              <UpdatingTitle dark={dark.dark}>
                Updating #{(selectedUser as UserInterface)._id.$oid} User:
              </UpdatingTitle>
              <UserEditorCreator
                select={selectedUser as UserInterface}
                closeModal={onCloseUserEditor}
              />
            </>
          ) : (
            "An error showed up. Please, try again."
          )}
        </AdNewContainer>
      </NoteBackground>
    );
  };

  const RoomEditor: FC<RoomEditorProps> = ({ roomId, onCloseRoomEditor }) => {
    const selectedRoom = (data as DataArray).find((room: TableRow) => {
      if (dataType === "rooms" && (room as RoomInterface)) {
        return (room as RoomInterface)._id.$oid === roomId;
      } else {
        return false;
      }
    });
    return (
      <NoteBackground>
        <AdNewContainer dark={dark.dark}>
          <FloatCross onClick={onCloseRoomEditor} />
          {selectedRoom && dataType === "rooms" ? (
            <>
              <UpdatingTitle dark={dark.dark}>
                Updating #{(selectedRoom as RoomInterface)._id.$oid} Room:
              </UpdatingTitle>
              <RoomeEditorCreator
                select={selectedRoom as RoomInterface}
                closeModal={onCloseRoomEditor}
              />
            </>
          ) : (
            "An error showed up. Please, try again."
          )}
        </AdNewContainer>
      </NoteBackground>
    );
  };

  type Header =
    | "guest"
    | "special_request"
    | "room"
    | "status"
    | "availability"
    | "offer_price"
    | "price"
    | "amenities"
    | "room_name"
    | "date"
    | "customer"
    | "subject"
    | "archived"
    | "name"
    | "activity"
    | "job_description"
    | "contact"
    | "comment"
    | "order_date"
    | "check_in"
    | "check_out"
    | "room_type"
    | "start_date";

  type RowData = {
    _id: {
      $oid: string;
    };
    surname: string;
    room_type: string;
    type: string;
    room_number: string;
    status: string;
    availability: string;
    discount: number;
    price: number;
    amenities: string[];
    date: string;
    name: string;
    phone: string;
    subject: string;
    archived: boolean;
    avatar: string;
    username: string;
    email: string;
    position: string;
    photo: string;
    activity: string;
    job_description: string;
    contact: string;
    comment: string;
    check_in: string;
    check_out: string;
    order_date: string;
    room_description: string;
    photos: string;
    number: number;
    start_date: string;
  };

  const cellRenderer = (header: Header, rowData: RowData) => {
    switch (header) {
      case "guest":
        return (
          <>
            <SimpleDiv dark={dark.dark}>
              {rowData.name} {rowData.surname}
            </SimpleDiv>
            <StyledLink
              dark={dark.dark.toString()}
              onClick={() => handleGetDetails(rowData._id.$oid)}
              to={`/bookings/${rowData._id.$oid}`}
            >
              {rowData._id.$oid}
            </StyledLink>
          </>
        );

      case "special_request":
        return (
          <SpecialRequestButton
            dark={dark.dark}
            onClick={() => handleOpenNote(rowData._id.$oid)}
          >
            Special Request
          </SpecialRequestButton>
        );

      case "room":
        return (
          <SampleDiv dark={dark.dark}>
            {rowData.room_type} - {rowData.room_number}
          </SampleDiv>
        );
      case "room_type":
        return <SampleDiv dark={dark.dark}>{rowData.type}</SampleDiv>;

      case "status":
        const trashIcon =
          statusInfo === "fulfilled" ? (
            <TrashIcon
              datatype="bookings"
              onClick={() => handleDelete(rowData._id.$oid)}
            />
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
            <TrashIcon onClick={() => handleDelete(rowData._id.$oid)} />
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
            <EditIcon
              dark={dark.dark.toString()}
              onClick={() => handleOpenModal(rowData._id.$oid, dataType)}
            />
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
            dark={dark.dark}
            style={{
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {rowData.discount > 0 &&
              "$" + (rowData.price - (rowData.price * rowData.discount) / 100)}
          </InfoWrap>
        );

      case "price":
        return (
          <InfoWrap
            dark={dark.dark}
            style={{
              color: rowData.discount > 0 ? "#b2b2b2" : "",
              textDecoration: rowData.discount > 0 ? "line-through" : "",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {`$${rowData[header]}`}
          </InfoWrap>
        );

      case "amenities":
        return (
          <>
            <AmenitiesDiv dark={dark.dark}>
              {rowData.amenities.map((amenity, index) => (
                <AmenityWrapper key={index}>
                  <AmenityContent>{amenity}</AmenityContent>
                </AmenityWrapper>
              ))}
            </AmenitiesDiv>
            <FadeDiv right={true} dark={dark.dark} />
            <FadeDiv dark={dark.dark} />
          </>
        );

      case "room_name":
        return (
          <RoomPhotoWrap>
            <ImageRoom src={rowData.photos} />
            <DataSpecs>
              <DataId
                dark={dark.dark.toString()}
                to={`/rooms/${rowData._id.$oid}`}
                onClick={() => handleGetDetails(rowData._id.$oid)}
              >
                {rowData._id.$oid}
              </DataId>
              <PhotoRoomSpec dark={dark.dark}>{rowData.number}</PhotoRoomSpec>
            </DataSpecs>
          </RoomPhotoWrap>
        );

      case "date":
        return (
          <SampleDiv style={{ fontWeight: 600 }} dark={dark.dark}>
            {formatDate(rowData.date)}
          </SampleDiv>
        );

      case "customer":
        return (
          <InfoWrap dark={dark.dark} style={{ minWidth: "300px" }}>
            <InfoLine>{rowData.name}</InfoLine>
            <InfoLine>{rowData.email}</InfoLine>
            <InfoLine>{rowData.phone}</InfoLine>
          </InfoWrap>
        );

      case "subject":
        return (
          <SubjectWrapper dark={dark.dark}>{rowData.subject}</SubjectWrapper>
        );

      case "archived":
        const trashContactIcon =
          statusInfo === "fulfilled" ? (
            <TrashIcon
              datatype="contact"
              onClick={() => handleDelete(rowData._id.$oid)}
            />
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
                handleArchiveComment(rowData._id.$oid, rowData.archived)
              }
              style={
                dark.dark
                  ? {
                      backgroundColor: rowData.archived ? "#5ad07a" : "#E23428",
                      color: rowData.archived ? "#e8ffee" : "#FFEDEC",
                      maxWidth: "130px",
                    }
                  : {
                      backgroundColor: rowData.archived ? "#e8ffee" : "#FFEDEC",
                      color: rowData.archived ? "#5ad07a" : "#E23428",
                      maxWidth: "130px",
                    }
              }
            >
              {statusContact()}
            </StatusButton>
            {trashContactIcon}
          </>
        );

      case "name":
        return (
          <UserDataWrap>
            <UserImage src={rowData.avatar} />
            <DataSpecs>
              <UserName dark={dark.dark}>{rowData.username}</UserName>
              <UserId dark={dark.dark}>{rowData._id.$oid}</UserId>
              <UserLink dark={dark.dark} href={`mailto:${rowData.email}`}>
                {rowData.email}
              </UserLink>
              <UserEmployee>{rowData.position}</UserEmployee>
            </DataSpecs>
          </UserDataWrap>
        );

      case "activity":
        const trashUserIcon =
          statusInfo === "fulfilled" ? (
            <TrashIcon onClick={() => handleDelete(rowData._id.$oid)} />
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
            <EditIcon
              dark={dark.dark.toString()}
              onClick={() => handleOpenModal(rowData._id.$oid, dataType)}
            />
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
        return <UserJob dark={dark.dark}>{rowData.job_description}</UserJob>;
      case "contact":
        return (
          <UserDataWrap>
            <BsTelephoneInbound
              style={{
                color: dark.dark ? "#ffffff" : "#202020",
                transition: "all 250ms ease-in-out",
              }}
            />
            <UserLink dark={dark.dark} href={`tel:${rowData.contact}`}>
              {rowData.contact}
            </UserLink>
          </UserDataWrap>
        );
      case "comment":
        return (
          <SampleDiv dark={dark.dark}>
            <CommentWrapper dark={dark.dark}>{rowData.comment}</CommentWrapper>
          </SampleDiv>
        );
      case "check_in":
        const checkIn = new Date(rowData.check_in);
        return (
          <DateDiv>
            <SampleDiv dark={dark.dark}>
              {format(checkIn, "yyyy MMMM do")}
            </SampleDiv>
            <SampleDiv dark={dark.dark}> {format(checkIn, "HH:mm")} </SampleDiv>
          </DateDiv>
        );
      case "order_date":
        const orderDate = new Date(rowData.order_date);
        return (
          <SampleDiv dark={dark.dark}>
            {format(orderDate, "yyyy/MM/dd HH:mm")}
          </SampleDiv>
        );
      case "check_out":
        const checkOut = new Date(rowData.check_in);
        return (
          <DateDiv>
            <SampleDiv dark={dark.dark}>
              {format(checkOut, "yyyy MMMM do")}
            </SampleDiv>
            <SampleDiv dark={dark.dark}>{format(checkOut, "HH:mm")}</SampleDiv>
          </DateDiv>
        );
      case "start_date":
        const startDate = new Date(rowData.start_date);
        return (
          <DateDiv>
            <SampleDiv dark={dark.dark}>
              {format(startDate, "yyyy MMMM do")}
            </SampleDiv>
            <SampleDiv dark={dark.dark}>{format(startDate, "HH:mm")}</SampleDiv>
          </DateDiv>
        );

      default:
        return <SampleDiv dark={dark.dark}>{rowData[header]}</SampleDiv>;
    }
  };

  return (
    <Table>
      <Thead>
        <TrNotHover>
          {headers.map((header) => (
            <Th dark={dark.dark} key={header} header={header}>
              {header.replace(/_/g, " ")}
            </Th>
          ))}
        </TrNotHover>
      </Thead>
      <Tbody>
        {data.map((rowData, index) => (
          <Tr dark={dark.dark} key={index}>
            {headers.map((header) => (
              <Td key={header as Header}>
                {headers.includes(header as Header) &&
                  cellRenderer(header as Header, rowData as RowData)}
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
