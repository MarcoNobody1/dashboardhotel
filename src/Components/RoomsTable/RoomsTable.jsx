import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { roomdeleteStatus } from "../../features/Rooms/roomSlice";
import { useEffect, useState } from "react";
import { deleteRoomsData, get1RoomData } from "../../features/Rooms/roomThunks";
import { CheckIn, ContentWrapper, InfoWrap, OrderDate, RowWrapper, StatusDiv, TrashIcon } from "../../GeneralComponents";
import { LineWave } from "react-loader-spinner";



const Floater = styled.div`
  position: absolute;
  right: 55%;
`;

const ImageRoom = styled.img`
  width: 150px;
  height: 70px;
  background-color: #747474;
`;

const RoomPhotoWrap = styled.div`
  flex-direction: row;
  display: flex;
  gap: 15px;
  flex-direction: row;
  min-width: 300px;
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

export const RoomTableContent = (props) => {
  const rooms = props.data;
  const dispatch = useDispatch();
  const statusInfo = useSelector(roomdeleteStatus);
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
    dispatch(deleteRoomsData(id));
  };

  const handleGetDetails = (id) => {
    dispatch(get1RoomData(id));
  };

  return (
    <>
      <ContentWrapper>
        {rooms.map((room) => (
          <RowWrapper key={room.room_name.id}>
            <RoomPhotoWrap>
              <ImageRoom src={room.room_name.room_photo} />
              <PhotoSpecs>
                <PhotoId
                  to={`/rooms/${room.room_name.id}`}
                  onClick={() => handleGetDetails(room.room_name.id)}
                >
                  {room.room_name.id}
                </PhotoId>
                <PhotoRoomSpec>{room.room_name.room_number}</PhotoRoomSpec>
              </PhotoSpecs>
            </RoomPhotoWrap>
            <InfoWrap>
              <OrderDate>{room.room_type}</OrderDate>
            </InfoWrap>
            <InfoWrap style={{ minWidth: "480px" }}>
              <CheckIn>{room.amenities.join(", ")}</CheckIn>
            </InfoWrap>
            <InfoWrap
              style={{
                color: room.offer_price.isOffer && "#b2b2b2",
                textDecoration: room.offer_price.isOffer && "line-through",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              ${room.price}
            </InfoWrap>
            <InfoWrap style={{ fontWeight: 600, fontSize: "18px" }}>
              {room.offer_price.isOffer &&
                "$" +
                  (room.price - (room.price * room.offer_price.discount) / 100)}
            </InfoWrap>
            <InfoWrap style={{ minWidth: "200px" }}>
              <StatusDiv
                style={{
                  backgroundColor:
                    room.status === "available" ? "#e8ffee" : "#FFEDEC",
                  color: room.status === "available" ? "#5ad07a" : "#E23428",
                  maxWidth: "130px",
                }}
              >
                {room.status}
              </StatusDiv>
            </InfoWrap>
            {currentStatus === "fulfilled" ? (
              <TrashIcon onClick={() => handleDelete(room.room_name.id)} />
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
    </>
  );
};
