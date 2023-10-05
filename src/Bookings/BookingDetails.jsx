import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../GeneralComponents";
import { IoArrowBackOutline } from "react-icons/io5";
import room from "../assets/hotelRoom.jpg";
import { useDispatch, useSelector } from "react-redux";
import { detailData, statusinfo } from "../features/Bookings/bookingSlice";
import { Hourglass } from "react-loader-spinner";
import { Floater } from "./Bookings";
import { get1Data, getData } from "../features/Bookings/bookingThunks";

const formatDate = (inputDate) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = inputDate.split("-");
  const year = dateParts[0];
  const monthIndex = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const month = months[monthIndex];

  const daySuffix = getDaySuffix(day);

  return `${month} ${day}${daySuffix}, ${year}`;
};

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

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

const PriceSpan = styled.span`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
  margin-left: 10px;
`;

const RequestWrapper = styled.div`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: #363636;
  font-style: italic;
  margin-bottom: 50px;
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
  top: 40px;
  right: -80px;
  transform: rotate(45deg);
  text-transform: uppercase;
  font-weight: 800;
`;

const ImageRoomInfo = styled.div`
  position: relative;
  top: -190px;
  padding: 20px;
  background: rgb(152, 152, 152);
  background: linear-gradient(
    180deg,
    rgba(152, 152, 152, 0) 0%,
    rgba(34, 34, 34, 0.7063200280112045) 15%
  );
`;

const ImageRoomTitle = styled.p`
  font: normal normal 500 24px/35px Poppins;
  letter-spacing: 0px;
  position: relative;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ImageRoomDescription = styled(ImageRoomTitle)`
  font-weight: 400;
  font-size: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BookingDetails = () => {
  const selectedBooking = useSelector(detailData);
  const statusInfo = useSelector(statusinfo);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currenBooking, setCurrentBooking] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    dispatch(get1Data(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (statusInfo === "rejected") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "pending") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "fulfilled") {
      setCurrentStatus(statusInfo);
      setCurrentBooking(selectedBooking);
    }
  }, [selectedBooking, statusInfo]);

  return (
    <>
      {currentStatus === "fulfilled" ? (
        <PageWrapper>
          <BookingWrapper>
            <ButtonReturn to="/bookings">
              <IoArrowBackOutline />
            </ButtonReturn>
            <DetailsWrapper>
              <GuestName>
                {currenBooking.guest.nombre} {currenBooking.guest.apellidos}
              </GuestName>
              <BookingId>ID {currenBooking.guest.id_reserva}</BookingId>
              <InfoContainer>
                <InfoWrap>
                  <InfoTitle>Check In</InfoTitle>
                  <InfoContentUpperRow>
                    {formatDate(currenBooking.check_in)}
                  </InfoContentUpperRow>
                </InfoWrap>
                <InfoWrap>
                  <InfoTitle>Check Out</InfoTitle>
                  <InfoContentUpperRow>
                    {formatDate(currenBooking.check_out)}
                  </InfoContentUpperRow>
                </InfoWrap>
                <Gap />
                <InfoWrap>
                  <InfoTitle>Room Info</InfoTitle>
                  <InfoContentBelowRow>
                    {currenBooking.room.room_type} -{" "}
                    {currenBooking.room.room_number}
                  </InfoContentBelowRow>
                </InfoWrap>
                <InfoWrap>
                  <InfoTitle>Price</InfoTitle>
                  <InfoContentBelowRow>
                    {currenBooking.room.price}
                  </InfoContentBelowRow>
                  <PriceSpan>/night</PriceSpan>
                </InfoWrap>
              </InfoContainer>
              <RequestWrapper>"{currenBooking.special_request}"</RequestWrapper>
              <InfoWrap>
                <InfoTitle>Amenities</InfoTitle>
                <AmenitiesContainer>
                  {currenBooking.room.amenities.map((amenity, index) => (
                    <AmenityWrapper key={index}>
                      <AmenityContent>{amenity}</AmenityContent>
                    </AmenityWrapper>
                  ))}
                </AmenitiesContainer>
              </InfoWrap>
            </DetailsWrapper>
            <ImageWrapper>
              <Image src={room} />
              <StatusWrapper
                style={{
                  backgroundColor:
                    currenBooking.status === "Check In"
                      ? "#e8ffee"
                      : currenBooking.status === "Check Out"
                      ? "#FFEDEC"
                      : "#FEFFC2",
                  color:
                    currenBooking.status === "Check In"
                      ? "#5ad07a"
                      : currenBooking.status === "Check Out"
                      ? "#E23428"
                      : "#E2B308",
                  border:
                    currenBooking.status === "Check In"
                      ? "3px solid #5ad07a"
                      : currenBooking.status === "Check Out"
                      ? "3px solid #E23428"
                      : "3px solid #E2B308",
                }}
              >
                {currenBooking.status}
              </StatusWrapper>
              <ImageRoomInfo>
                <ImageRoomTitle>{currenBooking.room.room_type}</ImageRoomTitle>
                <ImageRoomDescription>
                  {currenBooking.room.room_description}
                </ImageRoomDescription>
              </ImageRoomInfo>
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

export default BookingDetails;
