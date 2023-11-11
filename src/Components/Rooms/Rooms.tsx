import React, { FC, useContext, useEffect, useState } from "react";
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
} from "../GeneralComponents/GeneralComponents";
import { getRoomsData } from "../../features/Rooms/roomThunks";
import { roomsInfo, roomstatusinfo } from "../../features/Rooms/roomSlice";
import DynamicTable from "../GeneralComponents/DynamicTable";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { RoomeEditorCreator } from "./RoomEditorCreator";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoomInterface } from "../../features/Interfaces/Interfaces";
import { ThemeContext } from "../../Context/ToggleTheme";

export const Rooms: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomsData());
  }, [dispatch]);

  const infoRooms = useAppSelector(roomsInfo);
  const statusInfo = useAppSelector(roomstatusinfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All Rooms");
  const { dark } = useContext(ThemeContext);
  const [selected, setSelected] = useState("Roomnumber");

  const filtered = infoRooms.filter((room) => {
    switch (filter) {
      case "All Rooms":
        return true;
      case "Available":
        return room.availability === "Available";
      case "Booked":
        return room.availability === "Booked";
      default:
        return false;
    }
  });

  const calculateRealPrice = (room: RoomInterface) => {
    if (room.discount && room.discount > 0) {
      const discountedPrice = room.price * (1 - room.discount / 100);
      return discountedPrice;
    }
    return room.price;
  };

  if (selected === "Roomnumber") {
    filtered.sort((a, b) => {
      const numberA = a.number;
      const numberB = b.number;
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
      <TableContainer dark={dark.dark}>
        <DynamicTable data={filtered} dataType={"rooms"} />
      </TableContainer>
    );
  };


  interface ModalProps {
    onClose: () => void
  }
  const Modal: FC<ModalProps> = ({ onClose }) => {
    return (
      <ModalBackground>
        <AdNewContainer dark={dark.dark}>
          <CrossIcon onClick={onClose} />
          <NewDataTitle dark={dark.dark}>Create a New Room</NewDataTitle>
          <RoomeEditorCreator closeModal={onClose} />
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
                color: dark.dark ? "#41ebbd" : "#135846",
                borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
              } : {}}
              onClick={() => setFilter("All Rooms")}
            >
              All Rooms
            </ButtonFilter>
            <ButtonFilter
              style={filter === "Available" ? {
                color: dark.dark ? "#41ebbd" : "#135846",
                borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
              } : {}}
              onClick={() => setFilter("Available")}
            >
              Available
            </ButtonFilter>
            <ButtonFilter
              style={filter === "Booked" ? {
                color: dark.dark ? "#41ebbd" : "#135846",
                borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
              } : {}}
              onClick={() => setFilter("Booked")}
            >
              Booked
            </ButtonFilter>
          </ButtonsContainer>
          <AddRoomButton style={{
            backgroundColor: dark.dark ? "#41ebbd" : "#135846",
            color: dark.dark ? "#171717" : "#ffffff"
          }}
            onClick={() => setIsModalOpen(true)}>
            + New Room
          </AddRoomButton>
          {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
          <SelectorFilter
            name="filterRoomsSelector"
            defaultValue="Roomnumber"
            dark={dark.dark}
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
