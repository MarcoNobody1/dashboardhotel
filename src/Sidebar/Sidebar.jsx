import React from "react";
import styled from "styled-components";

const OuterWrap = styled.div`
  width: 18vw;
  background-color: yellowgreen;
  padding: 32px 20px;
  min-width: 160px;
`;

export const Sidebar = () => {
  return <OuterWrap>Sidebar</OuterWrap>;
};

export default Sidebar;
