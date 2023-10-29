import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  PageWrapper,
  formatDate,
} from "../GeneralComponents/GeneralComponents";
import { IoArrowBackOutline } from "react-icons/io5";
import room from "../../assets/hotelRoom.jpg";
import {
  bookingIdStatus,
  detailData,
} from "../../features/Bookings/bookingSlice";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { FC } from 'react';
import { useAppSelector } from "../../app/hooks";

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
  position: absolute;
  bottom: 0px;
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

export const BookingDetails : FC = () => {
  const selectedBooking = useAppSelector(detailData);
  const oneBookingStatus = useAppSelector(bookingIdStatus);

  const data = () =>{
    return (
      <>
      <DetailsWrapper>
        <GuestName>
          {selectedBooking.guest.nombre} {selectedBooking.guest.apellidos}
        </GuestName>
        <BookingId>ID {selectedBooking.guest.id_reserva}</BookingId>
        <InfoContainer>
          <InfoWrap>
            <InfoTitle>Check In</InfoTitle>
            <InfoContentUpperRow>
              {formatDate(selectedBooking.check_in)}
            </InfoContentUpperRow>
          </InfoWrap>
          <InfoWrap>
            <InfoTitle>Check Out</InfoTitle>
            <InfoContentUpperRow>
              {formatDate(selectedBooking.check_out)}
            </InfoContentUpperRow>
          </InfoWrap>
          <Gap />
          <InfoWrap>
            <InfoTitle>Room Info</InfoTitle>
            <InfoContentBelowRow>
              {selectedBooking.room.room_type} -{" "}
              {selectedBooking.room.room_number}
            </InfoContentBelowRow>
          </InfoWrap>
          <InfoWrap>
            <InfoTitle>Price</InfoTitle>
            <InfoContentBelowRow>
              {selectedBooking.room.price}
            </InfoContentBelowRow>
            <PriceSpan>/night</PriceSpan>
          </InfoWrap>
        </InfoContainer>
        <RequestWrapper>"{selectedBooking.special_request}"</RequestWrapper>
        <InfoWrap>
          <InfoTitle>Amenities</InfoTitle>
          <AmenitiesContainer>
            {selectedBooking.room.amenities.map((amenity, index) => (
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
              selectedBooking.status === "Check In"
                ? "#e8ffee"
                : selectedBooking.status === "Check Out"
                ? "#FFEDEC"
                : "#FEFFC2",
            color:
              selectedBooking.status === "Check In"
                ? "#5ad07a"
                : selectedBooking.status === "Check Out"
                ? "#E23428"
                : "#E2B308",
            border:
              selectedBooking.status === "Check In"
                ? "3px solid #5ad07a"
                : selectedBooking.status === "Check Out"
                ? "3px solid #E23428"
                : "3px solid #E2B308",
          }}
        >
          {selectedBooking.status}
        </StatusWrapper>
        <ImageRoomInfo>
          <ImageRoomTitle>{selectedBooking.room.room_type}</ImageRoomTitle>
          <ImageRoomDescription>
            {selectedBooking.room.room_description}
          </ImageRoomDescription>
        </ImageRoomInfo>
      </ImageWrapper>
    </>
    )
  }

  return (
    <>
      <PageWrapper>
        <BookingWrapper>
          <ButtonReturn to="/bookings">
            <IoArrowBackOutline />
          </ButtonReturn>
          {renderStatus(oneBookingStatus, data)}
        </BookingWrapper>
      </PageWrapper>
    </>
  );
};

export default BookingDetails;
