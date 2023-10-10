import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../GeneralComponents";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { roomdetailData, roomstatusinfo } from "../features/Rooms/roomSlice";
import { Hourglass } from "react-loader-spinner";
import { Floater } from "../GeneralComponents";
import { get1RoomData, getRoomsData } from "../features/Rooms/roomThunks";

const BookingWrapper = styled.div`
  background-color: #fff;
  max-width: 1475px;
  min-height: 700px;
  border: 1px solid black;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  position: relative;
  display: flex;
`;

const ButtonReturn = styled(NavLink)`
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 24px;
  color: #799283;
`;

const DetailsWrapper = styled.div`
  flex: 1;
  padding: 40px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  width: 100%;
  background-color: #c5c5c5;
  border-radius: 0 20px 20px 0;
  position: relative;
  overflow: hidden;
`;

const GuestName = styled.p`
  font: normal normal 600 30px/46px Poppins;
  letter-spacing: 0px;
  color: #212121;
  margin-top: 20px;
  margin-bottom: 16px;
`;

const BookingId = styled.span`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
  text-align: right;
  display: block;
  margin-bottom: 10px;
  color: #799283;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;
`;

const Gap = styled.div`
  width: 100%;
  border-bottom: 2px solid #ebebeb;
  margin-bottom: 15px;
`;

const InfoWrap = styled.div`
  min-width: 250px;

  &:nth-child(3) {
    border-bottom: none;
  }
  &:nth-child(4) {
    border-bottom: none;
  }
`;

const InfoTitle = styled.p`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #6e6e6e;
  margin-bottom: 15px;
`;

const InfoContentUpperRow = styled.p`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #212121;
  margin-bottom: 30px;
`;

const InfoContentBelowRow = styled(InfoContentUpperRow)`
  font: normal normal 500 24px/35px Poppins;

  &:nth-child(2) {
    display: inline-block;
  }
`;

const AmenityWrapper = styled.div`
  background: #e8f2ef;
  border-radius: 8px;
  padding: 15px;
  color: #135846;
  text-align: center;
  display: inline-block;
`;

const AmenityContent = styled.p`
  font: normal normal 500 14px/21px Poppins;
  letter-spacing: 0px;
  color: inherit;
`;

const AmenitiesContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const StatusWrapper = styled.div`
  padding: 20px 100px;
  position: absolute;
  top: 30px;
  right: -80px;
  transform: rotate(45deg);
  text-transform: uppercase;
  font-weight: 800;
`;


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RoomDetails = () => {
  const selectedRoom = useSelector(roomdetailData);
  const roomstatusInfo = useSelector(roomstatusinfo);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentRoom, setCurrentRoom] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomsData());
    dispatch(get1RoomData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (roomstatusInfo === "rejected") {
      setCurrentStatus(roomstatusInfo);
    } else if (roomstatusInfo === "pending") {
      setCurrentStatus(roomstatusInfo);
    } else if (roomstatusInfo === "fulfilled") {
      setCurrentStatus(roomstatusInfo);
      setCurrentRoom(selectedRoom);
    }
  }, [selectedRoom, roomstatusInfo]);

  return (
    <>
      {currentStatus === "fulfilled" ? (
        <PageWrapper>
          <BookingWrapper>
            <ButtonReturn to="/rooms">
              <IoArrowBackOutline />
            </ButtonReturn>
            <DetailsWrapper>
              <GuestName></GuestName>
              <BookingId>ID {currentRoom.room_name.id}</BookingId>
              <InfoContainer>
                <InfoWrap>
                  <InfoTitle>Room Type</InfoTitle>
                  <InfoContentBelowRow>
                    {currentRoom.room_type}
                  </InfoContentBelowRow>
                </InfoWrap>
                <Gap />
                <InfoWrap>
                  <InfoTitle>Room Info</InfoTitle>
                  <InfoContentUpperRow>
                    {currentRoom.room_name.room_description}
                  </InfoContentUpperRow>
                </InfoWrap>
              </InfoContainer>
              <InfoWrap>
                <InfoTitle>Amenities</InfoTitle>
                <AmenitiesContainer>
                  {currentRoom.amenities.map((amenity, index) => (
                    <AmenityWrapper key={index}>
                      <AmenityContent>{amenity}</AmenityContent>
                    </AmenityWrapper>
                  ))}
                </AmenitiesContainer>
              </InfoWrap>
            </DetailsWrapper>
            <ImageWrapper>
              <Image src={currentRoom.room_name.room_photo} />
              <StatusWrapper
                style={{
                  backgroundColor:
                    currentRoom.status === "available"
                      ? "#e8ffee"
                      : currentRoom.status === "booked"
                      ? "#FFEDEC"
                      : "#FEFFC2",
                  color:
                    currentRoom.status === "available"
                      ? "#5ad07a"
                      : currentRoom.status === "booked"
                      ? "#E23428"
                      : "#E2B308",
                  border:
                    currentRoom.status === "available"
                      ? "3px solid #5ad07a"
                      : currentRoom.status === "booked"
                      ? "3px solid #E23428"
                      : "3px solid #E2B308",
                }}
              >
                {currentRoom.status}
              </StatusWrapper>
            </ImageWrapper>
          </BookingWrapper>
        </PageWrapper>
      ) : currentStatus === "rejected" ? (
        alert("not good")
      ) : (
        <Floater>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#135846", "#e23428"]}
          />
        </Floater>
      )}
    </>
  );
};

export default RoomDetails;
