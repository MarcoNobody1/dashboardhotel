import { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import logo from "../../assets/LogoHotelHub.png";
import logoDark from "../../assets/LogoDarkHotelHub.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/Auth";
import { ThemeContext } from "../../Context/ToggleTheme";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loginAvatar,
  loginEmail,
  loginStatus,
  loginUsername,
  resetState,
} from "../../features/Login/loginSlice";
import { logIn } from "../../features/Login/loginThunks";
import { Oval } from "react-loader-spinner";

const LogWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 250ms ease-in-out;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LogForm = styled.form`
  padding: 20px;
  text-align: center;
  border-radius: 25px;
  min-width: 350px;
  transition: all 250ms ease-in-out;
`;

export const Input = styled.input.attrs((props) => ({
  $type: props.type || "text",
}))`
  display: block;
  margin: 0 auto;
  width: 80%;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.3s ease-out;

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  transition: all 0.25s ease-in-out;
`;

const Button = styled.button`
  text-align: center;
  display: block;
  padding: 10px;
  width: 50%;
  font-weight: 600;
  border-radius: 15px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 45px auto 15px;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 220px;
  height: 60px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transition: all 0.25s ease-in-out;
`;

const Advertice = styled.p`
  font-size: 0.7rem;
  display: inline-block;
  transition: all 0.25s ease-in-out;
`;

const SpinnerFloater = styled.div`
  position: absolute;
  bottom: 150px;
`;

export const Login = () => {
  const [user, setUser] = useState("test");
  const [password, setPassword] = useState("testuser");
  const nav = useNavigate();
  const { auth, authDispatch } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(loginStatus);
  const loginMail = useAppSelector(loginEmail);
  const loginPhoto = useAppSelector(loginAvatar);
  useEffect(() => {
    if (loginState === "fulfilled") {
      authDispatch({
        type: "login",
        payload: { username: user, email: loginMail, photo: loginPhoto },
      });

      nav("/");
      dispatch(resetState());
    } else if (loginState === "rejected") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        html: "<em>Please check hint before logging.</em>",
      });

      Toast.fire({
        icon: "error",
        title: "Wrong user or Password.",
      });
    }
  }, [auth, nav, loginState]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    await dispatch(logIn({ username: user, password: password }));
  };

  const handleuser = (event: ChangeEvent<HTMLInputElement>): void => {
    setUser(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <>
      <LogWrapper
        style={{
          backgroundImage: dark.dark
            ? "url(https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/BG2.png)"
            : "url(https://dashboardgeneralassets.s3.eu-west-1.amazonaws.com/Fotos+Dashboard/BG1.png)",
        }}
      >
        {loginState === "pending" && (
          <SpinnerFloater>
            <Oval
              height={100}
              width={100}
              color="#41ebbd"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#121212"
              strokeWidth={1}
              strokeWidthSecondary={3}
            />
          </SpinnerFloater>
        )}
        <LogForm
          style={{
            backgroundColor: dark.dark ? "#202020" : "#f8f8f8",
            border: dark.dark ? "1px solid #3D3D3D" : "1px solid black",
          }}
          onSubmit={handleSubmit}
        >
          <Label
            style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}
            htmlFor="user"
          >
            Username:
          </Label>
          <Input
            style={{
              color: dark.dark ? "#FFEDEC" : "#393939",
              border: dark.dark ? "2px solid #FFF" : "2px solid black",
              backgroundColor: dark.dark ? "#000" : "#FFF",
            }}
            data-cy="usernameInput"
            onChange={handleuser}
            id="user"
            type="text"
            placeholder="Type your e-mail"
            autoComplete="on"
            defaultValue={user}
          />
          <Label
            style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}
            htmlFor="password"
          >
            Password:
          </Label>

          <Input
            style={{
              color: dark.dark ? "#FFEDEC" : "#393939",
              border: dark.dark ? "2px solid #FFF" : "2px solid black",
              backgroundColor: dark.dark ? "#000" : "#FFF",
            }}
            data-cy="passwordInput"
            onChange={handlePassword}
            id="password"
            type="password"
            placeholder="Type your password"
            autoComplete="on"
            defaultValue={password}
          />
          <Button
            style={{
              border: dark.dark ? "1px solid #41ebbd" : "1px solid #135846",
              backgroundColor: dark.dark ? "#41ebbd" : "#135846",
              color: dark.dark ? "#171717" : "#FFF",
            }}
            data-cy="loginButton"
            type="submit"
          >
            Log In
          </Button>
          <Advertice style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}>
            <strong>Hint:</strong>
          </Advertice>
          <br />
          <Advertice style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}>
            Username: test
          </Advertice>
          <br />
          <Advertice style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}>
            Password: testuser
          </Advertice>
        </LogForm>
      </LogWrapper>
    </>
  );
};
