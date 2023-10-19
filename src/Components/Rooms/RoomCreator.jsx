import React, { useState } from "react";
import styled from "styled-components";
import { ButtonAdNew } from "../../GeneralComponents";
import { useDispatch } from "react-redux";
import { roomAmenities } from "../../data/roomAmenities";
import { roomPhotos } from "../../data/createNewPhotos";
import { addRoomData } from "../../features/Rooms/roomThunks";
import Swal from "sweetalert2";

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
  transition: all 250ms ease-out;
`;

const Actions = styled(Instructions)`
  flex: 2.5;
`;

const ActionRow = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 0;
  transition: all 250ms ease-out;
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

export const RoomCreator = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [checkedStates, setCheckedStates] = useState([
    false,
    false,
    false,
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
  const hasTrueValue = checkedStates.some((isChecked) => isChecked);

  const handleCheckboxChange = (index) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const calcTotalFee = () => {
    const percentage = discount / 100;
    return price - price * percentage;
  };

  const handleCreateNewRoom = () => {
    const finalPhotos = checkedStates
      .map((isChecked, index) => (isChecked ? roomPhotos[index] : null))
      .filter((photo) => photo !== null);

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    const newRoom = {
      room_name: {
        id: parseInt(
          Math.floor(Math.random() * (12345678 - 12345 + 1)) + 12345
        ).toString(),
        room_photo: finalPhotos[0],
        room_number: roomNumber === "" ? 111 : roomNumber,
        room_description:
          (description.replace(/\s/g, "") === "") | (description === null)
            ? "This is a sample description text"
            : description,
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
        discount: allowDiscount ? discount : 0,
      },
      availability: "available",
    };

    if (hasTrueValue) {
      dispatch(addRoomData(newRoom));
      setCheckedStates([false, false, false, false, false]);
      setPrice(150);
      setDiscount(15);
      setRoomType("Single Room");
      setRoomNumber(111);
      setDescription("");
      setAmenities("Standard");
      setAllowDiscount(false);
      Toast.fire({
        icon: "success",
        title: "Success!",
        timer: 1500,
        timerProgressBar: false,
        html: "<em>Room added to your list.</em>",
      });

      closeModal();
    } else {
      Toast.fire({
        icon: "error",
        title: "You must pick one photo!",
      });
    }
  };

  return (
    <Form
      name="createRoom"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateNewRoom();
      }}
    >
      <Instructions>
        <Instruction>
          <InstructionTitle>1. Select Photos:</InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle
            style={{
              opacity: hasTrueValue ? 1 : 0,
              fontSize: hasTrueValue ? "28px" : "0px",
            }}
          >
            2. Set Up Room:
          </InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle
            style={{
              opacity: hasTrueValue && description.length > 0 ? 1 : 0,
              fontSize: hasTrueValue && description.length > 0 ? "28px" : "0px",
            }}
          >
            3. Set Pricing:
          </InstructionTitle>
        </Instruction>
      </Instructions>
      <Actions>
        <ActionRow>
          <PhotoGroup
            src={roomPhotos[0]}
            checked={checkedStates[0]}
            onChange={() => handleCheckboxChange(0)}
          ></PhotoGroup>
          <PhotoGroup
            src={roomPhotos[1]}
            checked={checkedStates[1]}
            onChange={() => handleCheckboxChange(1)}
          ></PhotoGroup>
          <PhotoGroup
            src={roomPhotos[2]}
            checked={checkedStates[2]}
            onChange={() => handleCheckboxChange(2)}
          ></PhotoGroup>
          <PhotoGroup
            src={roomPhotos[3]}
            checked={checkedStates[3]}
            onChange={() => handleCheckboxChange(3)}
          ></PhotoGroup>
          <PhotoGroup
            src={roomPhotos[4]}
            checked={checkedStates[4]}
            onChange={() => handleCheckboxChange(4)}
          ></PhotoGroup>
        </ActionRow>
        <ActionRow
          style={{
            opacity: hasTrueValue ? 1 : 0,
            pointerEvents: hasTrueValue ? "all" : "none",
          }}
        >
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
                min="100"
                max="9999"
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
        <ActionRow
          style={{
            opacity: hasTrueValue && description.length > 0 ? 1 : 0,
            pointerEvents:
              hasTrueValue && description.length > 0 ? "all" : "none",
          }}
        >
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
      <ButtonAdNew
        style={{
          opacity: hasTrueValue && description.length > 0 ? 1 : 0,
          pointerEvents:
            hasTrueValue && description.length > 0 ? "all" : "none",
        }}
      >
        Add Room
      </ButtonAdNew>
    </Form>
  );
};
