import { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import logo from "../../assets/LogoHotelHub.png";
import logoDark from "../../assets/LogoDarkHotelHub.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/Auth";
import { ThemeContext } from "../../Context/ToggleTheme";

const LogWrapper = styled.div`
  height: 930px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 250ms ease-in-out;
`;

const LogForm = styled.form`
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  transition: all 250ms ease-in-out;
`;

export const Input = styled.input.attrs((props) => ({
  $type: props.type || "text",
}))`
  display: block;
  margin: 0 auto;
  width: 100%;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.05);
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
  padding: 5px 20px;
  width: 100%;
  background-color: #135846;
  font-weight: 600;
  border-radius: 15px;
  border: 1px solid #135846;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 15px;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 220px;
  margin-bottom: 10px;
  transition: all 0.25s ease-in-out;
`;

const Advertice = styled.p`
  font-size: 0.7rem;
  display: inline-block;
  transition: all 0.25s ease-in-out;
`;

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { auth, authDispatch } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    if (auth && auth.authenticated) {
      nav("/");

    }
  }, [auth, nav]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (email === "marcocamaradiaz@gmail.com" && password === "Marco") {
      authDispatch({
        type: "login",
        payload: { username: password, email: email },
      });

      nav("/");
    } else {
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
        title: "Wrong Email or Password.",
      });
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <>
      <LogWrapper style={{ backgroundColor: dark.dark ? "#171717" : "lightcyan" }}>
        <LogForm style={{ backgroundColor: dark.dark ? "#202020" : "#f8f8f8", border: dark.dark ? "1px solid #3D3D3D" : "1px solid black" }} onSubmit={handleSubmit}>
          <Logo src={dark.dark ? logoDark : logo} />
          <Label style={{ color: dark.dark ? "#FFEDEC" : "#393939" }} htmlFor="email">Email:</Label>
          <Input
            style={{ color: dark.dark ? "#FFEDEC" : "#393939", border: dark.dark ? "2px solid #FFF" : "2px solid black", backgroundColor: dark.dark ? "#000" : "#FFF" }}
            data-cy="usernameInput"
            onChange={handleEmail}
            id="email"
            type="email"
            placeholder="Type your e-mail"
            autoComplete="on"
          />
          <Label style={{ color: dark.dark ? "#FFEDEC" : "#393939" }} htmlFor="password">Password:</Label>
          <Input
            style={{ color: dark.dark ? "#FFEDEC" : "#393939", border: dark.dark ? "2px solid #FFF" : "2px solid black", backgroundColor: dark.dark ? "#000" : "#FFF" }}
            data-cy="passwordInput"
            onChange={handlePassword}
            id="password"
            type="password"
            placeholder="Type your password"
            autoComplete="on"
          />
          <Button data-cy="loginButton" type="submit">Log In</Button>
          <Advertice style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}>
            <strong>Hint:</strong>
          </Advertice>
          <br />
          <Advertice style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}> Email: marcocamaradiaz@gmail.com </Advertice>
          <br />
          <Advertice style={{ color: dark.dark ? "#FFEDEC" : "#393939" }}>Password: Marco</Advertice>
        </LogForm>
      </LogWrapper>
    </>
  );
};
