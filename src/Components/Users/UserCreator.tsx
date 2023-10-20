import React, { FC, useState } from "react";
import styled from "styled-components";
import { ButtonAdNew } from "../../GeneralComponents";
import { userPhotos } from "../../data/createNewPhotos";
import { addUserData } from "../../features/Users/userThunks";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../app/hooks";

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
  cursor: pointer;
`;

const Checker = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: none;
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
  position: relative;
`;

const ActionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  text-transform: capitalize;
  color: rgb(57, 57, 57);
`;

const Selector = styled.select`
  width: 80%;
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

const TextInput = styled.input`
  width: 80%;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  padding: 5px;

  &:hover{
    cursor: text;
  }
  
`;

interface InfoParagraphProps {
  password: string;
}

const InfoParagraph = styled.p<InfoParagraphProps>`
  font-weight: 500;
  font-size: 12px;
  width: 80%;
  text-align: left;
  color: #0d3128;
  position: absolute;
  bottom: -20px;
  display: ${(props) => (props.password.length >= 1 ? "initial" : "none")};
`;

const InputLabel = styled.label`
  font-size: 1rem;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;

  &input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const SliderSpan = styled.span`
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #eee;
  transition: 0.4s;
  border-radius: 0.5em;
  box-shadow: 0 0.2em #dfd9d9;

  &:before {
    position: absolute;
    content: "";
    height: 1.5em;
    width: 1.4em;
    border-radius: 0.3em;
    left: 0.3em;
    bottom: 0.7em;
    background-color: lightsalmon;
    transition: 0.4s;
    box-shadow: 0 0.4em #bcb4b4;
  }

  &:hover::before {
    box-shadow: 0 0.2em #bcb4b4;
    bottom: 0.5em;
  }
`;

const SliderInput = styled.input`
  &:checked + ${SliderSpan}:before {
    transform: translateX(2em);
    background: lightgreen;
  }
`;

interface StatusProps {
  active: boolean;
}

const NotActiveStatus = styled.p<StatusProps>`
  position: absolute;
  font-weight: 600;
  text-align: left;
  font-size: ${(props) => (props.active ? "10px" : "16px")};
  text-transform: uppercase;
  top: 55%;
  left: 75px;
  color: #e23428;
  opacity: ${(props) => (props.active ? 0 : 1)};
  transition: all 250ms ease-out;
`;

const ActiveStatus = styled.p<StatusProps>`
  position: absolute;
  text-align: left;
  font-weight: 600;
  font-size: ${(props) => (props.active ? "16px" : "10px")};
  text-transform: uppercase;
  top: 55%;
  right: 115px;
  color: #5ad07a;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 250ms ease-out;
`;

const getFormattedDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

interface UserCreatorProps {
  closeModal: () => void;
}


export const UserCreator: FC<UserCreatorProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [position, setPosition] = useState("Room Service");
  const [description, setDescription] = useState("");
  const [minDate, setMinDate] = useState(getFormattedDate());


  const handleCreateNewUser = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    if (username.trim().length === 0) {
      Toast.fire({
        icon: "error",
        title: "Full Name must contain at least one character.",
      });
      return;
    }

    if (phone.length < 9) {
      Toast.fire({
        icon: "error",
        title: "Phone number must have at least 9 digits.",
      });
      return;
    }



    if (password.length < 5) {
      Toast.fire({
        icon: "error",
        title: "Password must have at least 5 characters.",
      });
      return;
    }

    if (description.trim().length === 0) {
      Toast.fire({
        icon: "error",
        title: "Description must have at least one character.",
      });
      return;
    }

    const newUser = {
      name: {
        photo: selectedPhoto || "",
        username: username,
        id: (Math.floor(Math.random() * (12345678 - 12345 + 1)) + 12345).toString(),
        employee_position: position,
        email: email,
        password_hash: password,
      },
      start_date: date,
      job_description: description,
      contact: phone,
      activity: active ? "active" : "inactive",
    };
    console.log(active)

    if (selectedPhoto) {
      dispatch(addUserData(newUser));
      setActive(false)
      setSelectedPhoto("")
      setPhone("")
      setPassword("")
      setUsername("")
      setEmail("")
      setDate("")
      setPosition("Room Service")
      setDescription("")

      Toast.fire({
        icon: "success",
        title: "Success!",
        timer: 1500,
        timerProgressBar: false,
        html: "<em>User added to your list.</em>",
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
      name="createUser"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateNewUser();
      }}
    >
      <Instructions>
        <Instruction>
          <InstructionTitle>1. Select Photo:</InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle
            style={{
              opacity: selectedPhoto ? 1 : 0,
              fontSize: selectedPhoto ? "28px" : "0px",
            }}
          >
            2. Set Personal Data:
          </InstructionTitle>
        </Instruction>
        <Instruction>
          <InstructionTitle
            style={{
              opacity:
                selectedPhoto && username.length > 0 && password.length >= 1
                  ? 1
                  : 0,
              fontSize:
                selectedPhoto && username.length > 0 && password.length >= 1
                  ? "28px"
                  : "0px",
            }}
          >
            3. Set Details:
          </InstructionTitle>
        </Instruction>
      </Instructions>
      <Actions>
        <ActionRow>
          <PhotoWrapper>
            <Photo
              src={userPhotos[0]}
              style={selectedPhoto === userPhotos[0] ? {
                border: "5px solid #135846",
              } : {}}
              onClick={() => setSelectedPhoto(userPhotos[0])}
            />
            <Checker
              name="checker"
              value={userPhotos[0]}
              type="radio"
              checked={selectedPhoto === userPhotos[0]}
              onChange={() => setSelectedPhoto(userPhotos[0])}
            />
          </PhotoWrapper>
          <PhotoWrapper>
            <Photo
              src={userPhotos[1]}
              style={ selectedPhoto === userPhotos[1] ? {
                border: "5px solid #135846",
              }: {}}
              onClick={() => setSelectedPhoto(userPhotos[1])}
            />
            <Checker
              name="checker2"
              value={userPhotos[1]}
              type="radio"
              checked={selectedPhoto === userPhotos[1]}
              onChange={() => setSelectedPhoto(userPhotos[1])}
            />
          </PhotoWrapper>
          <PhotoWrapper>
            <Photo
              src={userPhotos[2]}
              style={ selectedPhoto === userPhotos[2] ? {
                border:"5px solid #135846",
              }:{}}
              onClick={() => setSelectedPhoto(userPhotos[2])}
            />
            <Checker
              name="checker3"
              value={userPhotos[2]}
              type="radio"
              checked={selectedPhoto === userPhotos[2]}
              onChange={() => setSelectedPhoto(userPhotos[2])}
            />
          </PhotoWrapper>
          <PhotoWrapper>
            <Photo
              src={userPhotos[3]}
              style={ selectedPhoto === userPhotos[3] ? {
                border:"5px solid #135846",
              }: {}}
              onClick={() => setSelectedPhoto(userPhotos[3])}
            />
            <Checker
              name="checker4"
              value={userPhotos[3]}
              type="radio"
              checked={selectedPhoto === userPhotos[3]}
              onChange={() => setSelectedPhoto(userPhotos[3])}
            />
          </PhotoWrapper>
          <PhotoWrapper>
            <Photo
              src={userPhotos[4]}
              style={ selectedPhoto === userPhotos[4] ? {
                border: "5px solid #135846",
              }: {}}
              onClick={() => setSelectedPhoto(userPhotos[4])}
            />
            <Checker
              name="checker5"
              value={userPhotos[4]}
              type="radio"
              checked={selectedPhoto === userPhotos[4]}
              onChange={() => setSelectedPhoto(userPhotos[4])}
            />
          </PhotoWrapper>
        </ActionRow>
        <ActionRow
          style={{
            opacity: selectedPhoto ? 1 : 0,
            pointerEvents: selectedPhoto ? "all" : "none",
          }}
        >
          <ActionGroup>
            <Action>
              <ActionTitle>Full Name:</ActionTitle>
              <TextInput
                name="typeSelector"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                placeholder={`e.g. :  Mr. Krabs`}
                minLength={1}
              />
            </Action>
            <Action>
              <ActionTitle>Password:</ActionTitle>
              <TextInput
                name="userPasswordInput"
                type="password"
                placeholder={`e.g. : ILoveMyBankAccount@99`}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={5}
              />
              <InfoParagraph password={password}>
                Your Password: {password}
              </InfoParagraph>
            </Action>
          </ActionGroup>
          <ActionGroup>
            <Action>
              <ActionTitle>Email:</ActionTitle>
              <TextInput
                name="userEmailInput"
                type="email"
                placeholder={`e.g. :  mrkrabs@iwantmymoney.com`}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Action>
            <Action>
              <ActionTitle>Phone Number:</ActionTitle>
              <TextInput
                name="userPhoneInput"
                type="tel"
                placeholder={`e.g. : 878888523`}
                minLength={9}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Action>
          </ActionGroup>
        </ActionRow>
        <ActionRow
          style={{
            opacity:
              selectedPhoto && username.length > 0 && password.length >= 1
                ? 1
                : 0,
            pointerEvents:
              selectedPhoto && username.length > 0 && password.length >= 1
                ? "all"
                : "none",
          }}
        >
          <ActionGroup>
            <Action>
              <ActionTitle>Start Date:</ActionTitle>
              <TextInput
                name="typeSelector"
                type="date"
                min={minDate}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
              />
            </Action>
            <Action>
              <ActionTitle>Employee Position:</ActionTitle>
              <Selector
                name="positionSelector"
                onChange={(event) => {
                  setPosition(event.target.value);
                }}
                defaultValue="Room Service"
              >
                <Option value="Room Service">
                  Room Service
                </Option>
                <Option value="Recepcionist">
                  Recepcionist
                </Option>
                <Option value="Manager">
                  Manager
                </Option>
              </Selector>
            </Action>
          </ActionGroup>
          <ActionGroup>
            <Action>
              <ActionTitle>Activy:</ActionTitle>
              <InputLabel>
                <SliderInput
                  name="userActiveCheckbox"
                  type="checkbox"
                  onChange={(event) => setActive(event.target.checked)}
                />
                <SliderSpan></SliderSpan>
              </InputLabel>
              <NotActiveStatus active={active}>Not Active</NotActiveStatus>
              <ActiveStatus active={active}>Active</ActiveStatus>
            </Action>
            <Action>
              <ActionTitle>description:</ActionTitle>
              <TextArea
                name="descriptionInput"
                placeholder="Add a brief description for the job..."
                onChange={(event) => setDescription(event.target.value)}
              ></TextArea>
            </Action>
          </ActionGroup>
        </ActionRow>
      </Actions>
      <ButtonAdNew
        style={{
          opacity:
            selectedPhoto && username.length > 0 && password.length >= 1
              ? 1
              : 0,
          pointerEvents:
            selectedPhoto && username.length > 0 && password.length >= 1
              ? "all"
              : "none",
        }}
      >
        Add User
      </ButtonAdNew>
    </Form>
  );
};
