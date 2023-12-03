import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonAdNew } from "../GeneralComponents/GeneralComponents";
import {
  roomAmenities,
  roomAmenitiesInterface,
} from "../../data/roomAmenities";
import { roomPhotos } from "../../data/createNewPhotos";
import {
  addRoomData,
  getRoomsData,
  updateRoomData,
} from "../../features/Rooms/roomThunks";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../app/hooks";
import { DarkProp, RoomInterface } from "../../features/Interfaces/Interfaces";
import { ThemeContext } from "../../Context/ToggleTheme";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { set } from "cypress/types/lodash";
import { sendEmail } from "../../features/Emails/emailHandler";

const Form = styled.form`
  display: flex;
  flex: 30;
`;

const Instructions = styled.div<DarkProp>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 51px;
  color: ${(props) => (props.dark ? "#eef9f2" : "#202020")};
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
  color: inherit;
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
  position: relative;
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

const ActionGroup = styled.div<DarkProp>`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.dark ? "#41ebbd" : "#202020")};
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
  color: inherit;
`;

const Selector = styled.select<DarkProp>`
  width: 90%;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 16px;
  border: 1px solid #135846;
  color: ${(props) => (props.dark ? "#41ebbd" : "#135846")};
  background-color: transparent;
  font-weight: 500;
  cursor: pointer;
`;

const Option = styled.option<DarkProp>`
  font-weight: 500;
  cursor: pointer;
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
`;

const TextArea = styled.textarea<DarkProp>`
  color: ${(props) => (props.dark ? "#41ebbd" : "#135846")};
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  border: 1px solid #135846;
  width: 80%;
  padding: 5px;
`;

const NumberInput = styled.input<DarkProp>`
  width: 80%;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #135846;
  color: ${(props) => (props.dark ? "#41ebbd" : "#135846")};
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
`;

const RangeInput = styled.input`
  cursor: pointer;
  transition: all 250ms ease-in-out;
`;

const InfoParagraph = styled.p`
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  text-align: center;
  transition: all 250ms ease-in-out;
`;

interface PhotoGroupProps {
  src: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoGroup: FC<PhotoGroupProps> = ({ src, checked, onChange }) => {
  const { dark } = useContext(ThemeContext);
  return (
    <PhotoWrapper>
      <Photo
        src={src}
        style={
          checked
            ? { border: dark.dark ? "5px solid #41ebbd" : "5px solid #135846" }
            : {}
        }
      />
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

interface RoomeEditorCreatorProps {
  select?: RoomInterface;
  closeModal: () => void;
}

type AmenityOptions = "Standard" | "Advanced" | "Premium" | "FullRoom";

export const RoomeEditorCreator: FC<RoomeEditorCreatorProps> = ({
  select,
  closeModal,
}) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const { dark } = useContext(ThemeContext);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (select && select.photos) {
      const updatedCheckedStates = checkedStates.map((state, index) => {
        return select.photos.includes(roomPhotos[index]);
      });

      setCheckedStates(updatedCheckedStates);
    }
  }, [select]);
  const amenityType = select
    ? select.amenities.length === 11
      ? "FullRoom"
      : select.amenities.length === 9
      ? "Premium"
      : select.amenities.length === 7
      ? "Advanced"
      : "Standard"
    : "Standard";
  const [price, setPrice] = useState(select ? select.price : 150);
  const [discount, setDiscount] = useState(select ? select.discount : 15);
  const [roomType, setRoomType] = useState(
    select ? select.type : "Single Room"
  );
  const [roomNumber, setRoomNumber] = useState(select ? select.number : 111);
  const [description, setDescription] = useState(
    select ? select.description : ""
  );
  const [amenities, setAmenities] = useState<AmenityOptions>(
    select ? amenityType : "Standard"
  );
  const [allowDiscount, setAllowDiscount] = useState(
    select && select.discount !== undefined && select.discount > 0
  );
  const hasThreePhotos = select
    ? checkedStates.some((isChecked) => isChecked)
    : checkedStates.filter((value) => value).length >= 3;

  const handleCheckboxChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };

  const getAmenityType = (
    select: RoomInterface,
    roomAmenities: roomAmenitiesInterface
  ) => {
    const selectAmenities = select.amenities;

    if (
      roomAmenities.FullRoom.every((amenity) =>
        selectAmenities.includes(amenity)
      )
    ) {
      return "FullRoom";
    }
    if (
      roomAmenities.Premium.every((amenity) =>
        selectAmenities.includes(amenity)
      )
    ) {
      return "Premium";
    }
    if (
      roomAmenities.Advanced.every((amenity) =>
        selectAmenities.includes(amenity)
      )
    ) {
      return "Advanced";
    }
    if (
      roomAmenities.Standard.every((amenity) =>
        selectAmenities.includes(amenity)
      )
    ) {
      return "Standard";
    }

    return "No Match";
  };

  const calcTotalFee = () => {
    const percentage = discount / 100;
    const totalFee = price - price * percentage;
    return totalFee.toFixed(2);
  };

  const handleUpdateCreateRoom = () => {
    const finalPhotos = checkedStates
      .map((isChecked, index) => (isChecked ? roomPhotos[index] : null))
      .filter((photo) => photo !== null) as string[];

    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    const newRoom = select
      ? {
          _id: select._id,
          photos: finalPhotos || "",
          number: roomNumber === null ? 111 : roomNumber,
          description:
            description.replace(/\s/g, "") === "" || description === null
              ? "This is a sample description text."
              : description,
          type: roomType,
          amenities:
            amenities === "Standard"
              ? roomAmenities.Standard
              : amenities === "Advanced"
              ? roomAmenities.Advanced
              : amenities === "Premium"
              ? roomAmenities.Premium
              : roomAmenities.FullRoom,
          price: price,
          discount: allowDiscount ? discount : 0,
          availability: "Available",
        }
      : {
          photos: finalPhotos || "",
          number: roomNumber === null ? 111 : roomNumber,
          description:
            description.replace(/\s/g, "") === "" || description === null
              ? "This is a sample description text."
              : description,
          type: roomType,
          amenities:
            amenities === "Standard"
              ? roomAmenities.Standard
              : amenities === "Advanced"
              ? roomAmenities.Advanced
              : amenities === "Premium"
              ? roomAmenities.Premium
              : roomAmenities.FullRoom,
          price: price,
          discount: allowDiscount ? discount : 0,
          availability: "Available",
        };

    if (hasThreePhotos) {
      const action = select ? updateRoomData : addRoomData;
      const subject = [
        "A new room has been created!",
        `Room with ID ${newRoom._id} has been modified`,
      ];
      const body = `
      <h2 style="background-color: black;color: white; width: 100%; text-align: center" id="welcome">This is the room's data now:</h1>
      <div style="width: 100%; border: 2px solid black; border-radius: 20px; background-color: lightcyan">
      <ul>
        <li> <strong  style="text-decoration: underline">Photos (length)</strong>: ${newRoom.photos.length}</li>
        <br>
        <li><strong  style="text-decoration: underline">Number</strong>: ${newRoom.number}</li>
        <br>
        <li><strong  style="text-decoration: underline">Description</strong>: ${newRoom.description}</li>
        <br>
        <li><strong  style="text-decoration: underline">Type</strong>: ${newRoom.type}</li>
        <br>
        <li><strong  style="text-decoration: underline">Amenities</strong>: ${newRoom.amenities}</li>
        <br>
        <li><strong  style="text-decoration: underline">Price</strong>: ${newRoom.price}</li>
        <br>
        <li><strong  style="text-decoration: underline">Discount</strong>: ${newRoom.discount}</li>
      </ul>
      </div>
      <div style="width: 100%; text-align: center;">
        <h3>
      Well done! The room is available NOW in:
    </h3>
      <a href="http://dashboardmiranda.s3-website-eu-west-1.amazonaws.com/rooms" style="font-size: 25px; text-decoration: none; cursor: pointer;" target="_blank">Dashboard Hotel Miranda</a>
      </div>
      `;
      dispatch(action(newRoom)).then(() => {
        dispatch(getRoomsData());
        select ? sendEmail(subject[1], body) : sendEmail(subject[0], body);
      });
      setCheckedStates([false, false, false, false, true]);
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
        title: "You must pick at least three photos!",
      });
    }
  };

  return (
    <Form
      name="createRoom"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateCreateRoom();
      }}
    >
      <Instructions dark={dark.dark}>
        <Instruction>
          <InstructionTitle>1. Select Photos:</InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle
            style={{
              opacity: hasThreePhotos ? 1 : 0,
              fontSize: hasThreePhotos ? "28px" : "0px",
            }}
          >
            2. Set Up Room:
          </InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle
            style={{
              opacity:
                hasThreePhotos && select && select.description.length > 0
                  ? 1
                  : description.length > 0
                  ? 1
                  : 0,
              fontSize:
                hasThreePhotos && select && select.description.length > 0
                  ? "28px"
                  : description.length > 0
                  ? "28px"
                  : "0px",
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
            opacity: hasThreePhotos ? 1 : 0,
            pointerEvents: hasThreePhotos ? "all" : "none",
          }}
        >
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>room type:</ActionTitle>
              <Selector
                dark={dark.dark}
                name="typeSelector"
                onChange={(event) => {
                  setRoomType(event.target.value);
                }}
                defaultValue={select ? select.type : roomType}
              >
                <Option dark={dark.dark} value="Single Room">
                  Single Room
                </Option>
                <Option dark={dark.dark} value="Double Room">
                  Double Room
                </Option>
                <Option dark={dark.dark} value="Double Superior">
                  Double Superior
                </Option>
                <Option dark={dark.dark} value="Suite">
                  Suite
                </Option>
              </Selector>
            </Action>
            <Action>
              <ActionTitle>amenities:</ActionTitle>
              <Selector
                dark={dark.dark}
                name="amenitiesSelector"
                onChange={(event) => {
                  setAmenities(event.target.value as AmenityOptions);
                }}
                defaultValue={
                  select ? getAmenityType(select, roomAmenities) : "Standard"
                }
              >
                <Option dark={dark.dark} value="Standard">
                  Standard Pack
                </Option>
                <Option dark={dark.dark} value="Advanced">
                  Advanced Pack
                </Option>
                <Option dark={dark.dark} value="Premium">
                  Premium Pack
                </Option>
                <Option dark={dark.dark} value="FullRoom">
                  'Full-Room' Pack
                </Option>
              </Selector>
            </Action>
          </ActionGroup>
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>room number:</ActionTitle>
              <NumberInput
                dark={dark.dark}
                name="roomNumberInput"
                type="number"
                defaultValue={select ? select.number : roomNumber}
                min="100"
                max="9999"
                onChange={(event) =>
                  setRoomNumber(parseInt(event.target.value))
                }
              />
            </Action>
            <Action>
              <ActionTitle>description:</ActionTitle>
              <TextArea
                dark={dark.dark}
                name="descriptionInput"
                placeholder="Add a brief description for the room..."
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={select ? select.description : undefined}
              ></TextArea>
            </Action>
          </ActionGroup>
        </ActionRow>
        <ActionRow
          style={{
            opacity:
              hasThreePhotos && select && select.description.length > 0
                ? 1
                : description.length > 0
                ? 1
                : 0,
            pointerEvents:
              hasThreePhotos && select && select.description.length > 0
                ? "all"
                : description.length > 0
                ? "all"
                : "none",
          }}
        >
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>price:</ActionTitle>
              <RangeInput
                name="priceInput"
                onChange={(event) => setPrice(parseInt(event.target.value))}
                type="range"
                min="50"
                max="1000"
                step="5"
                defaultValue={select ? select.price : price}
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
              <ActionTitle style={{ color: dark.dark ? "#41ebbd" : "#202020" }}>
                allow discount?
              </ActionTitle>
              <Checker
                name="offerInput"
                onChange={(event) => setAllowDiscount(event.target.checked)}
                type="checkbox"
                defaultChecked={allowDiscount}
              />
            </Action>
            <Action style={{ flex: "20" }}>
              <ActionTitle style={{ color: dark.dark ? "#41ebbd" : "#202020" }}>
                discount:
              </ActionTitle>
              <RangeInput
                disabled={allowDiscount ? false : true}
                name="discountInput"
                onChange={(event) => setDiscount(parseInt(event.target.value))}
                type="range"
                min="5"
                max="30"
                step="5"
                defaultValue={select ? select.discount : discount}
              />
              <InfoParagraph
                style={{
                  opacity: allowDiscount ? "100" : "0",
                  color: dark.dark ? "#41ebbd" : "#202020",
                }}
              >
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
                  color: dark.dark ? "#41ebbd" : "#202020",
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
          opacity:
            hasThreePhotos && select && select.description.length > 0
              ? 1
              : description.length > 0
              ? 1
              : 0,
          pointerEvents:
            hasThreePhotos && select && select.description.length > 0
              ? "all"
              : description.length > 0
              ? "all"
              : "none",
          color: dark.dark ? "#202020" : "#eef9f2",
          backgroundColor: dark.dark ? "#41ebbd" : "#135846",
        }}
      >
        {select ? "Save Changes" : "Add Room"}
      </ButtonAdNew>
    </Form>
  );
};
