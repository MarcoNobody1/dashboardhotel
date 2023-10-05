import styled from "styled-components";
import { BookingTitle, TableTitleWrapper } from "../../GeneralComponents";

const RoomTitle = styled(BookingTitle)`
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
  min-width: 130px;

  &:nth-child(1) {
    min-width: 300px;
  }
  &:nth-child(3) {
    min-width: 480px;
  }
  &:nth-child(6) {
    min-width: 200px;
  }
`;

export const RoomTableTitles = (props) => {
  const keys = Object.keys(props.data[0]);

  return (
    <>
      <TableTitleWrapper>
        {keys.map((title, index) => (
          <RoomTitle key={index}>{title.replace("_", " ")}</RoomTitle>
        ))}
      </TableTitleWrapper>
    </>
  );
};