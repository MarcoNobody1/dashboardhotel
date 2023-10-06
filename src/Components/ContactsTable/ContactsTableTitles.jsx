import styled from "styled-components";
import { BookingTitle, TableTitleWrapper } from "../../GeneralComponents";

const ContactsTitle = styled(BookingTitle)`
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
  min-width: 130px;

  &:nth-child(2) {
    min-width: 300px;
  }
  &:nth-child(4) {
    min-width: 480px;
  }
`;

export const ContactsTableTitles = (props) => {
  const keys = Object.keys(props.data[0]);

  return (
    <>
      <TableTitleWrapper>
        {keys.map((title, index) => (
          <ContactsTitle key={index}>{title.replace("_", " ")}</ContactsTitle>
        ))}
      </TableTitleWrapper>
    </>
  );
};