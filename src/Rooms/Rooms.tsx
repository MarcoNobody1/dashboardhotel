import React, { FC, useEffect, useState } from "react";
import {
  AdNewContainer,
  AddRoomButton,
  ButtonFilter,
  ButtonsContainer,
  CrossIcon,
  FilterContainer,
  ModalBackground,
  NewDataTitle,
  OptionSelect,
  OuterContainer,
  PageWrapper,
  SelectorFilter,
  TableContainer,
} from "../GeneralComponents";
import { getRoomsData } from "../features/Rooms/roomThunks";
import { roomsInfo, roomstatusinfo } from "../features/Rooms/roomSlice";
import DynamicTable from "../Components/DynamicTable";
import { renderStatus } from "../Components/RenderStatus";
import { RoomCreator } from "../Components/Rooms/RoomCreator";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RoomInterface } from "../features/Interfaces/Interfaces";

export const Rooms: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomsData());
  }, [dispatch]);

  const infoRooms = useAppSelector(roomsInfo);
  const statusInfo = useAppSelector(roomstatusinfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All Rooms");

  const [selected, setSelected] = useState("Roomnumber");

  const filtered = infoRooms.filter((room) => {
    switch (filter) {
      case "All Rooms":
        return true;
      case "Available":
        return room.availability === "available";
      case "Booked":
        return room.availability === "booked";
      default:
        return false;
    }
  });

  const calculateRealPrice = (room:RoomInterface) => {
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

  const RenderTable = () => {
    return (
      <TableContainer>
        <DynamicTable data={filtered} dataType={"rooms"} />
      </TableContainer>
    );
  };


  interface ModalProps{
    onClose: () => void
  }
  const Modal : FC<ModalProps> = ({ onClose }) => {
    return (
      <ModalBackground>
        <AdNewContainer>
          <CrossIcon onClick={onClose} />
          <NewDataTitle>Create a New Room</NewDataTitle>
          <RoomCreator closeModal={onClose} />
        </AdNewContainer>
      </ModalBackground>
    );
  };

  return (
    <PageWrapper>
      <OuterContainer>
        <FilterContainer>
          <ButtonsContainer>
            <ButtonFilter
              style={filter === "All Rooms" ? {
                color: "#135846",
                borderBottom: "2px solid #135846",
              } : {}}
              onClick={() => setFilter("All Rooms")}
            >
              All Rooms
            </ButtonFilter>
            <ButtonFilter
              style={ filter === "Available" ? {
                color:"#135846",
                borderBottom:"2px solid #135846",
              } : {}}
              onClick={() => setFilter("Available")}
            >
              Available
            </ButtonFilter>
            <ButtonFilter
              style={ filter === "Booked" ? {
                color: "#135846",
                borderBottom:"2px solid #135846",
              }:{}}
              onClick={() => setFilter("Booked")}
            >
              Booked
            </ButtonFilter>
          </ButtonsContainer>
          <AddRoomButton onClick={() => setIsModalOpen(true)}>
            + New Room
          </AddRoomButton>
          {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
          <SelectorFilter
            name="filterRoomsSelector"
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
        {renderStatus(statusInfo, RenderTable)}
      </OuterContainer>
    </PageWrapper>
  );
};
