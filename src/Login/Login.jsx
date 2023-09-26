import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/LogoHotelHub.png";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const LogWrapper = styled.div`
  background-color: lightcyan;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogForm = styled.form`
  border: 1px solid black;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  background-color: #f8f8f8;
`;

const Input = styled.input.attrs((props) => ({
  $type: props.type || "text",
}))`
  display: block;
  margin: 0 auto;
  width: 100%;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 2px solid black;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
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
`;

const Advertice = styled.p`
  font-size: 0.7rem;
  display: inline-block;
`;


export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "marcocamaradiaz@gmail.com" && password === "Marco") {
      props.setLoggedIn(true);
      nav("/");
      localStorage.setItem("log", JSON.stringify(true));
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

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };


  return (
    <>
      <LogWrapper>
        <LogForm onSubmit={handleSubmit}>
          <Logo src={logo} />
          <Label htmlFor="email">Email:</Label>
          <Input
            onChange={handleEmail}
            id="email"
            type="email"
            placeholder="Type your e-mail"
          />
          <Label htmlFor="password">Password:</Label>
          <Input
            onChange={handlePassword}
            id="password"
            type="password"
            placeholder="Type your password"
          />
          <Button type="submit">Log In</Button>
          <Advertice>
            <strong>Hint:</strong>
          </Advertice>
          <br />
          <Advertice> Email: marcocamaradiaz@gmail.com </Advertice>
          <br />
          <Advertice>Password: Marco</Advertice>
        </LogForm>
      </LogWrapper>
    </>
  );
};
