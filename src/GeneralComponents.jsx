import styled from "styled-components";

export const DefaultIcon = styled.div.attrs((props) => ({
  $color: props.$color || "#135846",
}))`
  font-size: 24px;
  color: ${(props) => props.$color};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export const PageWrapper = styled.div`
  background-color: #f8f8f8;
  width: 100%;
  height: 100vh;

`;
