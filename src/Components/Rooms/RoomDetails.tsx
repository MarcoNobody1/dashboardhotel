import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../GeneralComponents/GeneralComponents";
import { IoArrowBackOutline } from "react-icons/io5";
import { roomIdStatus, roomdetailData } from "../../features/Rooms/roomSlice";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { useAppSelector } from "../../app/hooks";
import { DarkProp } from "../../features/Interfaces/Interfaces";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ToggleTheme";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Autoplay, Navigation]);

const PersonalSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  margin: 0;
  transition: all 250ms ease-in-out;

  div.swiper-button-next {
    background-image: url("src/assets/arrow-right.png");
  }

  div.swiper-button-prev {
    background-image: url("src/assets/arrow-left.png");
  }

  div.swiper-button-prev,
  div.swiper-button-next {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;
    background-color: #fff;
    height: 60px;
    width: 60px;
    transition: all 250ms ease-in-out;
    margin-top: 5px;
    border-radius: 5px;

    &::after {
      display: none;
    }
  }
`;

const BookingWrapper = styled.div<DarkProp>`
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  max-width: 1475px;
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
  margin-bottom: 15px;
  color: #799283;
`;

const InfoContentUpperRow = styled.p<DarkProp>`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#212121")};
  margin-bottom: 30px;
  transition: all 250ms ease-in-out;
`;

const InfoContentBelowRow = styled(InfoContentUpperRow)<DarkProp>`
  font: normal normal 500 24px/35px Poppins;
  color: ${(props) => (props.dark ? "#41ebbd" : "#212121")};
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

export const RoomDetails: FC = () => {
  const selectedRoom = useAppSelector(roomdetailData);
  const oneRoomStatus = useAppSelector(roomIdStatus);
  const { dark } = useContext(ThemeContext);
  const data = () => {
    return (
      <>
        <DetailsWrapper dark={dark.dark}>
          <GuestName></GuestName>
          <BookingId>ID {selectedRoom._id}</BookingId>
          <InfoContainer>
            <InfoWrap>
              <InfoTitle>Room Type</InfoTitle>
              <InfoContentBelowRow dark={dark.dark}>
                {selectedRoom.type}
              </InfoContentBelowRow>
            </InfoWrap>
            <Gap />
            <InfoWrap>
              <InfoTitle>Room Info</InfoTitle>
              <InfoContentUpperRow dark={dark.dark}>
                {selectedRoom.description}
              </InfoContentUpperRow>
            </InfoWrap>
          </InfoContainer>
          <InfoWrap>
            <InfoTitle>Amenities</InfoTitle>
            <AmenitiesContainer>
              {selectedRoom.amenities.map((amenity, index) => (
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
            navigation={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Mousewheel, Keyboard]}
            className="my-swiper"
          >
            {selectedRoom.photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <Image src={photo} />
              </SwiperSlide>
            ))}
          </PersonalSwiper>
          <StatusWrapper
            style={{
              backgroundColor:
                selectedRoom.availability === "Available"
                  ? "#e8ffee"
                  : selectedRoom.availability === "Booked"
                  ? "#FFEDEC"
                  : "#FEFFC2",
              color:
                selectedRoom.availability === "Available"
                  ? "#5ad07a"
                  : selectedRoom.availability === "Booked"
                  ? "#E23428"
                  : "#E2B308",
              border:
                selectedRoom.availability === "Available"
                  ? "3px solid #5ad07a"
                  : selectedRoom.availability === "Booked"
                  ? "3px solid #E23428"
                  : "3px solid #E2B308",
            }}
          >
            {selectedRoom.availability}
          </StatusWrapper>
        </ImageWrapper>
      </>
    );
  };

  return (
    <>
      <PageWrapper>
        <BookingWrapper dark={dark.dark}>
          <ButtonReturn to="/rooms">
            <IoArrowBackOutline />
          </ButtonReturn>
          {renderStatus(oneRoomStatus, data)}
        </BookingWrapper>
      </PageWrapper>
    </>
  );
};

export default RoomDetails;
