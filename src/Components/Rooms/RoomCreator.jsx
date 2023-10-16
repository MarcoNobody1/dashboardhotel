import React, { useState } from "react";
import styled from "styled-components";
import { ButtonAdNew } from "../../Rooms/Rooms";

const Form = styled.form`
  display: flex;
  flex: 30;
`;

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 51px;
`;

const Instruction = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const InstructionTitle = styled.p`
  text-align: left;
  padding-left: 40px;
  font-weight: 600;
  font-size: 28px;
  color: rgb(38, 38, 38);
`;

const Actions = styled(Instructions)`
  flex: 2.5;
`;

const ActionRow = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 0;
`;

const PhotoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #135846;
  transition: all 250ms ease-out;
`;

const Checker = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ActionGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Action = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  flex-direction: column;
`;

const ActionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  text-transform: capitalize;
  color: rgb(57, 57, 57);
`;

const Selector = styled.select`
  width: 90%;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 16px;
  border: 1px solid #135846;
  color: #135846;
  font-weight: 500;
  cursor: pointer;
`;

const Option = styled.option`
  font-weight: 500;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  color: #135846;
  width: 80%;
  padding: 5px;
`;

const NumberInput = styled.input`
  width: 80%;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

const RangeInput = styled.input`
  cursor: pointer;
`;

const InfoParagraph = styled.p`
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  text-align: center;
`;

const PhotoGroup = ({ src, checked, onChange }) => {
  return (
    <PhotoWrapper>
      <Photo src={src} style={{ border: checked && "5px solid #135846" }} />
      <Checker
        name="checker"
        value={src}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </PhotoWrapper>
  );
};

const photos = [
  "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
  "https://ywcavan.org/sites/default/files/styles/scale_width_1440/public/assets/room/room_image/Single-bed-room-YWCA_Hotel_Vancouver.jpg",
  "https://galeriemagazine.com/wp-content/uploads/2019/03/243f89e0-8235-11e7-a767-bc310e55dd10_1320x770_154749-1024x597.jpg",
  "https://image-tc.galaxy.tf/wijpeg-clozx94odvn436foy8vjci4wz/empire-hotel-superior-double-room_standard.jpg",
  "https://www.cvent.com/sites/default/files/image/2021-10/hotel%20room%20with%20beachfront%20view.jpg",
];

export const RoomCreator = ({ closeModal }) => {
  const [checkedStates, setCheckedStates] = useState([
    true,
    true,
    true,
    false,
    false,
  ]);
  const [price, setPrice] = useState(150);
  const [discount, setDiscount] = useState(15);
  const [roomType, setRoomType] = useState("Single Room");
  const [roomNumber, setRoomNumber] = useState(111);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("Standard");
  const [allowDiscount, setAllowDiscount] = useState(false);

  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const calcTotalFee = () => {
    const percentage = discount / 100;
    return price - price * percentage;
  };

  const handleCreateNewRoom = (array) => {
    const photos = checkedStates.map((isChecked, index) =>
      isChecked ? photos.push(array[index]) : null
    );
    console.log(photos);

    const roomAmenities = {
      Standard: [
        "1/3 Bed Space",
        "Air Conditioner",
        "Television",
        "Towels",
        "Coffee Set",
      ],
      Advanced: [
        "1/2 Bathroom",
        "Free Wifi",
        "Air Conditioner",
        "Television",
        "Towels",
        "Mini Bar",
        "Coffee Set",
      ],
      Premium: [
        "1/3 Bed Space",
        "24-Hour Guard",
        "Free Wifi",
        "Air Conditioner",
        "Television",
        "Towels",
        "Mini Bar",
        "Coffee Set",
        "Nice Views",
      ],
      FullRoom: [
        "1/3 Bed Space",
        "24-Hour Guard",
        "Free Wifi",
        "Air Conditioner",
        "Television",
        "Towels",
        "Mini Bar",
        "Coffee Set",
        "Bathtub",
        "Jacuzzi",
        "Nice Views",
      ],
    };

    const newRoom = {
      room_name: {
        id: Math.floor(Math.random() * (12345678 - 12345 + 1)) + 12345,
        room_photo: photos[0],
        room_number: roomNumber,
        room_description: description,
      },
      room_type: roomType,
      amenities:
        amenities === "Standard"
          ? roomAmenities.Standard
          : amenities === "Advanced"
          ? roomAmenities.Advanced
          : amenities === "Premium"
          ? roomAmenities.Premium
          : roomAmenities.FullRoom,
      price: price,
      offer_price: {
        isOffer: allowDiscount,
        discount: discount,
      },
      availability: "available",
    };

    console.log(newRoom); // Aquí puedes hacer lo que quieras con el nuevo objeto newRoom

    setCheckedStates([true, true, true, false, false]);
    setPrice(150);
    setDiscount(15);
    setRoomType("Single Room");
    setRoomNumber(111);
    setDescription("");
    setAmenities("Standard");
    setAllowDiscount(false);

    closeModal(); //cierra el modal mediante props
  };

  return (
    <Form
      name="createRoom"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateNewRoom(photos);
      }}
    >
      <Instructions>
        <Instruction>
          <InstructionTitle>1. Select Photos:</InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle>2. Set Up Room:</InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle>3. Set Pricing:</InstructionTitle>
        </Instruction>
      </Instructions>
      <Actions>
        <ActionRow>
          <PhotoGroup
            src={photos[0]}
            checked={checkedStates[0]}
            onChange={() => handleCheckboxChange(0)}
          ></PhotoGroup>
          <PhotoGroup
            src={photos[1]}
            checked={checkedStates[1]}
            onChange={() => handleCheckboxChange(1)}
          ></PhotoGroup>
          <PhotoGroup
            src={photos[2]}
            checked={checkedStates[2]}
            onChange={() => handleCheckboxChange(2)}
          ></PhotoGroup>
          <PhotoGroup
            src={photos[3]}
            checked={checkedStates[3]}
            onChange={() => handleCheckboxChange(3)}
          ></PhotoGroup>
          <PhotoGroup
            src={photos[4]}
            checked={checkedStates[4]}
            onChange={() => handleCheckboxChange(4)}
          ></PhotoGroup>
        </ActionRow>
        <ActionRow>
          <ActionGroup>
            <Action>
              <ActionTitle>room type:</ActionTitle>
              <Selector
                name="typeSelector"
                onChange={(event) => {
                  setRoomType(event.target.value);
                }}
                defaultValue={roomType}
              >
                <Option name="Single Room" value="Single Room">
                  Single Room
                </Option>
                <Option name="Double Room" value="Double Room">
                  Double Room
                </Option>
                <Option name="Double Superior" value="Double Superior">
                  Double Superior
                </Option>
                <Option name="Suite" value="Suite">
                  Suite
                </Option>
              </Selector>
            </Action>
            <Action>
              <ActionTitle>amenities:</ActionTitle>
              <Selector
                name="amenitiesSelector"
                onChange={(event) => {
                  setAmenities(event.target.value);
                }}
                defaultValue="Standard"
              >
                <Option name="Standard" value="Standard">
                  Standard Pack
                </Option>
                <Option name="Advanced" value="Advanced">
                  Advanced Pack
                </Option>
                <Option name="Premium" value="Premium">
                  Premium Pack
                </Option>
                <Option name="FullRoom" value="FullRoom">
                  'Full-Room' Pack
                </Option>
              </Selector>
            </Action>
          </ActionGroup>
          <ActionGroup>
            <Action>
              <ActionTitle>room number:</ActionTitle>
              <NumberInput
                name="roomNumberInput"
                type="number"
                defaultValue={roomNumber}
                min="1"
                max="256"
                onChange={(event) => setRoomNumber(event.target.value)}
              />
            </Action>
            <Action>
              <ActionTitle>description:</ActionTitle>
              <TextArea
                name="descriptionInput"
                placeholder="Add a brief description for the room..."
                onChange={(event) => setDescription(event.target.value)}
              ></TextArea>
            </Action>
          </ActionGroup>
        </ActionRow>
        <ActionRow>
          <ActionGroup>
            <Action>
              <ActionTitle>price:</ActionTitle>
              <RangeInput
                name="priceInput"
                onChange={(event) => setPrice(event.target.value)}
                type="range"
                min="50"
                max="900"
                step="25"
                defaultValue={price}
              />
              <InfoParagraph>Your current price is ${price}.</InfoParagraph>
            </Action>
          </ActionGroup>
          <ActionGroup style={{ position: "relative" }}>
            <Action
              style={{
                position: "absolute",
                top: "0",
                left: "-100px",
                flexDirection: "row",
                padding: "5px 0 0 0",
                justifyContent: "flex-start",
              }}
            >
              <ActionTitle>allow discount?</ActionTitle>
              <Checker
                name="offerInput"
                onChange={(event) => setAllowDiscount(event.target.checked)}
                type="checkbox"
                defaultChecked={allowDiscount}
              />
            </Action>
            <Action style={{ flex: "20" }}>
              <ActionTitle>discount:</ActionTitle>
              <RangeInput
                disabled={allowDiscount ? false : true}
                name="discountInput"
                onChange={(event) => setDiscount(event.target.value)}
                type="range"
                min="5"
                max="30"
                step="5"
                defaultValue={discount}
              />
              <InfoParagraph style={{ opacity: allowDiscount ? "100" : "0" }}>
                Your current discount is {discount}%.
              </InfoParagraph>
              <InfoParagraph
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  position: "absolute",
                  bottom: "-10px",
                  left: "0px",
                  opacity: allowDiscount ? "100" : "0",
                }}
              >
                The final price will be ${calcTotalFee()}
              </InfoParagraph>
            </Action>
          </ActionGroup>
        </ActionRow>
      </Actions>
      <ButtonAdNew>Add Room</ButtonAdNew>
    </Form>
  );
};
