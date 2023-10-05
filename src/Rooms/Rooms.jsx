import React, { useEffect, useState } from "react";
import {
  PageWrapper,
  RoomTableContent,
  RoomTableTitles,
} from "../GeneralComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsData } from "../features/Rooms/roomThunks";
import { roomsInfo, roomstatusinfo } from "../features/Rooms/roomSlice";
import { Floater } from "../Bookings/Bookings";
import { Hourglass } from "react-loader-spinner";

const OuterContainer = styled.div`
  display: flex;
  width: 1474px;
  flex-direction: column;
  gap: 50px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 55px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 21px;
`;

const ButtonsContainer = styled(FilterContainer)`
  gap: 30px;
  padding: 5px;
  padding-bottom: 0;
  margin-right: 500px;
  border-bottom: 1px solid #d4d4d4;
`;

const ButtonFilter = styled.button`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #6e6e6e;
  background-color: transparent;
  width: max-content;
  padding: 5px 15px;
  border: none;
  border-bottom: 2px solid transparent;

  &:hover {
    color: #135846;
    cursor: pointer;
    border-bottom: 2px solid #135846;
  }
`;

const SelectorFilter = styled.select`
  min-width: 200px;
  max-height: 60px;
  background-color: #fff;
  border: 1px solid #135846;
  color: #135846;
  border-radius: 12px;
  padding-left: 5px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  cursor: pointer;
`;

const OptionSelect = styled.option`
  font: normal normal 400 16px/25px Poppins;
`;

const AddRoomButton = styled.button`
  background-color: #135846;
  text-align: center;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 12px;
  padding: 13px 55px;
`;

export const Rooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomsData());
  }, [dispatch]);

  const infoRooms = useSelector(roomsInfo);
  const statusInfo = useSelector(roomstatusinfo);

  const [currenRooms, setCurrentRooms] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [filter, setFilter] = useState("All Rooms");

  useEffect(() => {
    if (statusInfo === "rejected") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "pending") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "fulfilled") {
      setCurrentStatus(statusInfo);
      setCurrentRooms(infoRooms);
    }
  }, [infoRooms, statusInfo]);

  const [selected, setSelected] = useState("Roomnumber");

  const filtered = currenRooms.filter((room) => {
    switch (filter) {
      case "All Rooms":
        return true;
      case "Available":
        return room.status === "available";
      case "Booked":
        return room.status === "booked";
      default:
        return false;
    }
  });

  const calculateRealPrice = (room) => {
    if (room.offer_price && room.offer_price.isOffer) {
      const discount = room.offer_price.discount;
      const discountedPrice = room.price * (1 - discount / 100);
      return discountedPrice;
    }
    return room.price;
  };

  if (selected === "Roomnumber") {
    filtered.sort((a, b) => {
      const numberA = a.room_name.room_number;
      const numberB = b.room_name.room_number;
      return numberA - numberB;
    });
  } else if (selected === "Priceminmax") {
    filtered.sort((a, b) => {
      const priceA = calculateRealPrice(a);
      const priceB = calculateRealPrice(b);
      return priceA - priceB;
    });
  } else if (selected === "Pricemaxmin") {
    filtered.sort((a, b) => {
      const priceA = calculateRealPrice(a);
      const priceB = calculateRealPrice(b);
      return priceB - priceA;
    });
  }

  return (
    <PageWrapper>
      <OuterContainer>
        <FilterContainer>
          <ButtonsContainer>
            <ButtonFilter
              style={{
                color: filter === "All Rooms" && "#135846",
                borderBottom: filter === "All Rooms" && "2px solid #135846",
              }}
              onClick={() => setFilter("All Rooms")}
            >
              All Rooms
            </ButtonFilter>
            <ButtonFilter
              style={{
                color: filter === "Available" && "#135846",
                borderBottom: filter === "Available" && "2px solid #135846",
              }}
              onClick={() => setFilter("Available")}
            >
              Available
            </ButtonFilter>
            <ButtonFilter
              style={{
                color: filter === "Booked" && "#135846",
                borderBottom: filter === "Booked" && "2px solid #135846",
              }}
              onClick={() => setFilter("Booked")}
            >
              Booked
            </ButtonFilter>
          </ButtonsContainer>
          <AddRoomButton>+ New Room</AddRoomButton>
          <SelectorFilter
            defaultValue="Roomnumber"
            onChange={(event) => setSelected(event.target.value)}
          >
            <OptionSelect value="Roomnumber">Room Number</OptionSelect>
            <OptionSelect value="Priceminmax">
              Price (menor a mayor)
            </OptionSelect>
            <OptionSelect value="Pricemaxmin">
              Price (mayor a menor)
            </OptionSelect>
          </SelectorFilter>
        </FilterContainer>
        {currentStatus === "fulfilled" ? (
          <>
            <TableContainer>
              <RoomTableTitles data={filtered} />
              <RoomTableContent data={filtered} />
            </TableContainer>
          </>
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
      </OuterContainer>
    </PageWrapper>
  );
};
