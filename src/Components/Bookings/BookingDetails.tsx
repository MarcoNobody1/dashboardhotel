import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../GeneralComponents/GeneralComponents";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  bookingIdStatus,
  detailData,
} from "../../features/Bookings/bookingSlice";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { FC, useContext } from "react";
import { useAppSelector } from "../../app/hooks";
import { ThemeContext } from "../../Context/ToggleTheme";
import { DarkProp } from "../../features/Interfaces/Interfaces";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { format } from "date-fns";

SwiperCore.use([Autoplay, Pagination]);

const PersonalSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  margin: 0;
  transition: all 250ms ease-in-out;

  .swiper-pagination-bullet {
    background: black;
  }
  .swiper-pagination-bullet-active {
    background: white;
  }
`;

const BookingWrapper = styled.div<DarkProp>`
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  max-width: 1465px;
  min-height: 700px;
  border: 1px solid black;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 20px;
  position: relative;
  display: flex;
  margin: auto;
`;

const ButtonReturn = styled(NavLink)`
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 24px;
  color: #799283;
`;

const DetailsWrapper = styled.div<DarkProp>`
  flex: 1;
  padding: 40px;
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  transition: all 250ms ease-in-out;
  border-radius: 20px 0 0 20px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-height: 700px;
  background-color: #c5c5c5;
  border-radius: 0 20px 20px 0;
  position: relative;
  overflow: hidden;
`;

const GuestName = styled.p<DarkProp>`
  font: normal normal 600 30px/46px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#212121")};
  margin-top: 20px;
  margin-bottom: 16px;
  transition: all 250ms ease-in-out;
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

const InfoContentUpperRow = styled.p<DarkProp>`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#212121")};
  margin-bottom: 30px;
  transition: all 250ms ease-in-out;
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

const RequestWrapper = styled.div<DarkProp>`
  font: normal normal 400 14px/21px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#eef9f2" : "#363636")};
  font-style: italic;
  margin-bottom: 50px;
  transition: all 250ms ease-in-out;
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
  z-index: 100;
`;

const ImageRoomInfo = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 0px;
  width: 100%;
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

export const BookingDetails: FC = () => {
  const selectedBooking = useAppSelector(detailData);
  const oneBookingStatus = useAppSelector(bookingIdStatus);
  const { dark } = useContext(ThemeContext);
  const data = () => {
    return (
      <>
        <DetailsWrapper dark={dark.dark}>
          <GuestName dark={dark.dark}>
            {selectedBooking.name} {selectedBooking.surname}
          </GuestName>
          <BookingId>ID {selectedBooking._id}</BookingId>
          <InfoContainer>
            <InfoWrap>
              <InfoTitle>Check In</InfoTitle>
              <InfoContentUpperRow dark={dark.dark}>
                {format(new Date(selectedBooking.check_in), "MMMM do, yyyy")}
              </InfoContentUpperRow>
            </InfoWrap>
            <InfoWrap>
              <InfoTitle>Check Out</InfoTitle>
              <InfoContentUpperRow dark={dark.dark}>
                {format(new Date(selectedBooking.check_out), "MMMM do, yyyy")}
              </InfoContentUpperRow>
            </InfoWrap>
            <Gap />
            <InfoWrap>
              <InfoTitle>Room Info</InfoTitle>
              <InfoContentBelowRow dark={dark.dark}>
                {selectedBooking.room_type} - {selectedBooking.room_number}
              </InfoContentBelowRow>
            </InfoWrap>
            <InfoWrap>
              <InfoTitle>Price</InfoTitle>
              <InfoContentBelowRow dark={dark.dark}>
                {selectedBooking.price}
              </InfoContentBelowRow>
              <PriceSpan>/night</PriceSpan>
            </InfoWrap>
          </InfoContainer>
          <RequestWrapper dark={dark.dark}>
            "{selectedBooking.special_request}"
          </RequestWrapper>
          <InfoWrap>
            <InfoTitle>Amenities</InfoTitle>
            <AmenitiesContainer>
              {selectedBooking.room_amenities.map((amenity, index) => (
                <AmenityWrapper key={index}>
                  <AmenityContent>{amenity}</AmenityContent>
                </AmenityWrapper>
              ))}
            </AmenitiesContainer>
          </InfoWrap>
        </DetailsWrapper>
        <ImageWrapper>
          <PersonalSwiper
            cssMode={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
            modules={[Pagination, Mousewheel, Keyboard]}
            className="my-swiper"
          >
            {selectedBooking.room_photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <Image src={photo} />
              </SwiperSlide>
            ))}
          </PersonalSwiper>
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
            <ImageRoomTitle>{selectedBooking.room_type}</ImageRoomTitle>
            <ImageRoomDescription>
              {selectedBooking.room_description}
            </ImageRoomDescription>
          </ImageRoomInfo>
        </ImageWrapper>
      </>
    );
  };

  return (
    <>
      <PageWrapper>
        <BookingWrapper dark={dark.dark}>
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
