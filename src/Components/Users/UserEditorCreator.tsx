import React, { FC, useState } from "react";
import styled from "styled-components";
import { ButtonAdNew } from "../GeneralComponents/GeneralComponents";
import { userPhotos } from "../../data/createNewPhotos";
import {
  addUserData,
  getUsersData,
  updateUserData,
} from "../../features/Users/userThunks";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DarkProp, UserInterface } from "../../features/Interfaces/Interfaces";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ToggleTheme";
import { format } from "date-fns";
import { usersInfo } from "../../features/Users/userSlice";
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
  gap: 35px;
  color: ${(props) => (props.dark ? "#eef9f2" : "#202020")};
`;

const Instruction = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 35px;
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
  margin-bottom: 15px;
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

const AbsoluteWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: -5px;
  right: 60px;
`;

const SamePassCheck = styled.input``;

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

const ActionGroup = styled.div<DarkProp>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#202020")};
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
  color: inherit;
`;

const Selector = styled.select<DarkProp>`
  width: 80%;
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
  width: 80%;
  padding: 5px;
`;

const TextInput = styled.input<DarkProp>`
  width: 80%;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;

  padding: 5px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#135846")};
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};

  &:hover {
    cursor: text;
  }
`;

interface InfoParagraphProps {
  dark: boolean;
  password: string;
}

const InfoParagraph = styled.p<InfoParagraphProps>`
  font-weight: 500;
  font-size: 12px;
  width: 80%;
  text-align: left;
  color: ${(props) => (props.dark ? "#FFF" : "#0d3128")};
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

const CheckMark = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  top: 0;
  left: 0;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  box-shadow: 4px 4px var(--main-color);
  background-color: var(--input-out-of-focus);
  transition: all 0.3s;

  &:after {
    content: "";
    width: 7px;
    height: 15px;
    position: absolute;
    top: -5px;
    left: 7px;
    display: none;
    border: solid var(--bg-color);
    border-width: 0 2.5px 2.5px 0;
    transform: rotate(45deg);
  }
`;

const CheckContainer = styled.label<DarkProp>`
  --input-focus: #41ebbd;
  --input-out-of-focus: #ccc;
  --bg-color: ${(props) => (props.dark ? "#FFF" : "#121212")};
  --bg-color-alt: #666;
  --main-color: ${(props) => (props.dark ? "#323232" : "#1a362f")};
  position: relative;
  cursor: pointer;
  margin-bottom: 3px;

  & ${SamePassCheck} {
    position: absolute;
    opacity: 0;
  }

  & ${SamePassCheck}:checked ~ ${CheckMark} {
    background-color: var(--input-focus);
  }

  & ${SamePassCheck}:checked ~ ${CheckMark}:after {
    display: block;
  }
`;

const SameText = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: inherit;
`;

const getFormattedDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

interface UserEditorCreatorProps {
  select?: any;
  closeModal: () => void;
}

export const UserEditorCreator: FC<UserEditorCreatorProps> = ({
  select,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const { dark } = useContext(ThemeContext);
  const [active, setActive] = useState(
    select && select.activity === "active" ? true : false
  );
  const [selectedPhoto, setSelectedPhoto] = useState(
    select ? select.avatar : ""
  );
  const fecha = new Date(select ? select.start_date : 15 - 11 - 1998);
  const fechaFormateada = format(fecha, "yyyy-MM-dd");
  const [phone, setPhone] = useState(select ? select.contact : "");
  const [password, setPassword] = useState("12345");
  const [username, setUsername] = useState(select ? select.username : "");
  const [email, setEmail] = useState(select ? select.email : "");
  const [date, setDate] = useState(select ? fechaFormateada : "");
  const [position, setPosition] = useState(
    select ? select.position : "Room Service"
  );
  const [description, setDescription] = useState(
    select ? select.job_description : ""
  );
  const [minDate, setMinDate] = useState(getFormattedDate());
  const [samePass, setSamePass] = useState(false);
  const allUsers: UserInterface[] = useAppSelector(usersInfo);

  const handleUpdateCreateUser = () => {
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
    let dataWithoutPassword = {};

    const checkEmailOnUpdate = () => {
      if (select) {
        dataWithoutPassword = {
          _id: select._id || "",
          avatar: selectedPhoto || "",
          username: username,
          position: position,
          email: email,
          start_date: date === "" ? getFormattedDate() : date,
          job_description: description,
          contact: phone,
          activity: active ? "active" : "inactive",
        };
        const isEmailRegistered = allUsers.map((user) => {
          if (user.email === email) return true;
          return false;
        });

        const allMinusThisUsers = allUsers.filter((user) => {
          return user._id !== select._id;
        });

        const isRegisteredEmailUserDuplicated = allMinusThisUsers.some(
          (user) => user.email === email
        );

        if ((isEmailRegistered && !select) || isRegisteredEmailUserDuplicated) {
          Toast.fire({
            icon: "error",
            title: "This email is already registered!",
          });
          return;
        }
      } else {
        true;
      }
    };

    checkEmailOnUpdate();

    const dataUser = select
      ? {
          _id: select._id || "",
          avatar: selectedPhoto || "",
          username: username,
          position: position,
          email: email,
          password: password,
          start_date: date === "" ? getFormattedDate() : date,
          job_description: description,
          contact: phone,
          activity: active ? "active" : "inactive",
        }
      : {
          avatar: selectedPhoto || "",
          username: username,
          position: position,
          email: email,
          password: password,
          start_date: date === "" ? getFormattedDate() : date,
          job_description: description,
          contact: phone,
          activity: active ? "active" : "inactive",
        };

    if (selectedPhoto) {
      const finalData = samePass ? dataWithoutPassword : dataUser;
      const finalDispatch = () => {
        const subject = [
          "A new user has been created!",
          `User with ID ${dataUser._id} has been modified`,
        ];
        const body = `

        
        Username: ${dataUser.username},
        Position: ${dataUser.position},
        Email: ${dataUser.email},
        Password: ${
          samePass ? "(Not modified)" : dataUser.password
        },
        Start Date: ${dataUser.start_date},
        Job Description: ${dataUser.job_description},
        Contact: ${dataUser.contact}
        
HURRAY! Well done!

<h2 style="background-color: black;color: white; width: 100%; text-align: center" id="welcome">This is the user's data now:</h2>
  <div style="box-shadow: 0px 14px 24px 0px rgba(190, 173, 142, 0.27); width: 100%; border: 2px solid black; border-radius: 20px; background-color: lightcyan">
  <ul style="text-align: left">
    <li> <strong  style="text-decoration: underline">Username</strong>: ${dataUser.username}</li>
    <br>
    <li><strong  style="text-decoration: underline">Position</strong>: ${dataUser.position}</li>
    <br>
    <li><strong  style="text-decoration: underline">Email</strong>: ${dataUser.email}</li>
    <br>
    <li><strong  style="text-decoration: underline">Password</strong>: ${dataUser.password}</li>
    <br>
    <li><strong  style="text-decoration: underline">Start Date</strong>: ${dataUser.start_date}</li>
    <br>
    <li><strong  style="text-decoration: underline">Job Description</strong>: ${dataUser.job_description}</li>
    <br>
    <li><strong  style="text-decoration: underline">Contact</strong>: ${dataUser.contact}</li>
  </ul>
  </div>
  <div style="width: 100%; text-align: center;">
    <h3>
  Well done! The user is available NOW in:
</h3>
  <a href="http://dashboardmiranda.s3-website-eu-west-1.amazonaws.com/users" style="font-size: 25px; text-decoration: none; cursor: pointer;" target="_blank">Dashboard Hotel Miranda</a>
  </div>
        `;

        if (!select) {
          dispatch(addUserData(dataUser)).then(() => {
            dispatch(getUsersData());
            sendEmail(subject[0], body);
          });
        } else {
          dispatch(updateUserData(finalData));
          sendEmail(subject[1], body);
        }
      };
      finalDispatch();
      setActive(false);
      setSelectedPhoto("");
      setPhone("");
      setPassword("");
      setUsername("");
      setEmail("");
      setDate("");
      setPosition("Room Service");
      setDescription("");

      Toast.fire({
        icon: "success",
        title: "Success!",
        timer: 1500,
        timerProgressBar: false,
        html: "<em>User added to your list!.</em>",
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
      name="updateCreateUser"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateCreateUser();
      }}
    >
      <Instructions dark={dark.dark}>
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
          {select ? (
            <PhotoWrapper
              style={{ position: "absolute", top: "0px", left: "-40px" }}
            >
              <Photo
                src={select.avatar}
                style={
                  selectedPhoto === select.avatar
                    ? {
                        border: dark.dark
                          ? "5px solid #41ebbd"
                          : "5px solid #135846",
                        width: "60px",
                        height: "60px",
                      }
                    : { width: "40px", height: "40px" }
                }
                onClick={() => setSelectedPhoto(select.avatar)}
              />
              <Checker
                name="checker"
                value={select.avatar}
                type="radio"
                checked={selectedPhoto === select.avatar}
                onChange={() => setSelectedPhoto(select.avatar)}
              />
            </PhotoWrapper>
          ) : null}
          <PhotoWrapper>
            <Photo
              src={userPhotos[0]}
              style={
                selectedPhoto === userPhotos[0]
                  ? {
                      border: dark.dark
                        ? "5px solid #41ebbd"
                        : "5px solid #135846",
                    }
                  : {}
              }
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
              style={
                selectedPhoto === userPhotos[1]
                  ? {
                      border: dark.dark
                        ? "5px solid #41ebbd"
                        : "5px solid #135846",
                    }
                  : {}
              }
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
              style={
                selectedPhoto === userPhotos[2]
                  ? {
                      border: dark.dark
                        ? "5px solid #41ebbd"
                        : "5px solid #135846",
                    }
                  : {}
              }
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
              style={
                selectedPhoto === userPhotos[3]
                  ? {
                      border: dark.dark
                        ? "5px solid #41ebbd"
                        : "5px solid #135846",
                    }
                  : {}
              }
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
              style={
                selectedPhoto === userPhotos[4]
                  ? {
                      border: dark.dark
                        ? "5px solid #41ebbd"
                        : "5px solid #135846",
                    }
                  : {}
              }
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
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>Full Name:</ActionTitle>
              <TextInput
                dark={dark.dark}
                name="typeSelector"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                placeholder={`e.g. :  Mr. Krabs`}
                minLength={1}
                defaultValue={select ? select.username : undefined}
              />
            </Action>
            <Action>
              <ActionTitle>Password:</ActionTitle>
              {select ? (
                <AbsoluteWrapper>
                  <CheckContainer dark={dark.dark}>
                    <SamePassCheck
                      name="samePasswordCheckbox"
                      type="checkbox"
                      onChange={(event) => setSamePass(event.target.checked)}
                      defaultChecked={samePass}
                    />
                    <CheckMark />
                  </CheckContainer>
                  <SameText>Same Password?</SameText>
                </AbsoluteWrapper>
              ) : null}
              <TextInput
                dark={dark.dark}
                name="userPasswordInput"
                type="password"
                placeholder={
                  select && samePass
                    ? "You keep your old password!"
                    : `e.g. : ILoveMyBankAccount@99`
                }
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={5}
                disabled={select ? samePass : false}
              />
              {!samePass || !select ? (
                <InfoParagraph dark={dark.dark} password={password}>
                  Your Password: {password}
                </InfoParagraph>
              ) : null}
            </Action>
          </ActionGroup>
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>Email:</ActionTitle>
              <TextInput
                dark={dark.dark}
                name="userEmailInput"
                type="email"
                placeholder={`e.g. :  mrkrabs@iwantmymoney.com`}
                onChange={(event) => setEmail(event.target.value)}
                defaultValue={select ? select.email : undefined}
              />
            </Action>
            <Action>
              <ActionTitle>Phone Number:</ActionTitle>
              <TextInput
                dark={dark.dark}
                name="userPhoneInput"
                type="tel"
                placeholder={`e.g. : 878888523`}
                minLength={9}
                onChange={(event) => setPhone(event.target.value)}
                defaultValue={select ? select.contact : undefined}
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
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>Start Date:</ActionTitle>
              <TextInput
                dark={dark.dark}
                name="typeSelector"
                type="date"
                min={select ? undefined : minDate}
                onChange={(event) => {
                  setDate(event.target.value);
                }}
                defaultValue={select ? fechaFormateada : undefined}
              />
            </Action>
            <Action>
              <ActionTitle>Employee Position:</ActionTitle>
              <Selector
                dark={dark.dark}
                name="positionSelector"
                onChange={(event) => {
                  setPosition(event.target.value);
                }}
                defaultValue={select ? select.position : "Room Service"}
              >
                <Option dark={dark.dark} value="Room Service">
                  Room Service
                </Option>
                <Option dark={dark.dark} value="Recepcionist">
                  Recepcionist
                </Option>
                <Option dark={dark.dark} value="Manager">
                  Manager
                </Option>
              </Selector>
            </Action>
          </ActionGroup>
          <ActionGroup dark={dark.dark}>
            <Action>
              <ActionTitle>Activy:</ActionTitle>
              <InputLabel>
                <SliderInput
                  name="userActiveCheckbox"
                  type="checkbox"
                  onChange={(event) => setActive(event.target.checked)}
                  defaultChecked={
                    select && select.activity === "active" ? true : false
                  }
                />
                <SliderSpan></SliderSpan>
              </InputLabel>
              <NotActiveStatus active={active}>Not Active</NotActiveStatus>
              <ActiveStatus active={active}>Active</ActiveStatus>
            </Action>
            <Action>
              <ActionTitle>description:</ActionTitle>
              <TextArea
                dark={dark.dark}
                name="descriptionInput"
                placeholder="Add a brief description for the job..."
                onChange={(event) => setDescription(event.target.value)}
                defaultValue={select ? select.job_description : undefined}
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
          color: dark.dark ? "#202020" : "#eef9f2",
          backgroundColor: dark.dark ? "#41ebbd" : "#135846",
        }}
      >
        {select ? "Save Changes" : "Add User"}
      </ButtonAdNew>
    </Form>
  );
};
