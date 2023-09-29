import React from "react";
import { useParams } from "react-router";
import { bookingsData } from "../data/bookingsjson";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper } from "../GeneralComponents";
import { IoArrowBackOutline } from "react-icons/io5";

const BookingWrapper = styled.div`
  background-color: #fff;
  min-width: 1475px;
  min-height: 792px;
  border: 1px solid black;
  box-shadow: 0px 4px 4px #00000005;
  border-radius:20px;
  position: relative;
  display: flex;
`;

const ButtonReturn = styled(NavLink)`
position: absolute;
top: 30px;
left: 30px;
font-size: 24px;
`;

const DetailsWrapper = styled.div`
flex: 1;
border: 1px solid black;
border-radius:20px;
`;

const ImageWrapper = styled.div`
flex: 1;
border: 1px solid black;
border-radius:20px;
`;

export const BookingDetails = () => {
  const { id } = useParams();

  return (
    <>
      <PageWrapper>
        <BookingWrapper>
          <ButtonReturn to="/bookings">
            <IoArrowBackOutline />
          </ButtonReturn>
          <DetailsWrapper></DetailsWrapper>
          <ImageWrapper></ImageWrapper>
        </BookingWrapper>
      </PageWrapper>
    </>
  );
};

export default BookingDetails;
