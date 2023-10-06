import {
  ContentWrapper,
  InfoWrap,
  OrderDate,
  RowWrapper,
} from "../../GeneralComponents";
import styled from "styled-components";

const InfoLine = styled.p`
  font: normal normal 400 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
`;

const StatusButton = styled.button`
  font: normal normal 600 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 13px;
  text-align: center;
  text-transform: capitalize;
  transition: all 150ms ease-out;
  &:hover {
    cursor: pointer;
    filter: invert(0.2);
  }
`;

export const ContactTableContent = (props) => {
  const contacts = props.data;

  return (
    <>
      <ContentWrapper>
        {contacts.map((contact) => (
          <RowWrapper key={contact.date.id}>
            <InfoWrap>
              <OrderDate>{contact.date.send_date}</OrderDate>
            </InfoWrap>
            <InfoWrap style={{ minWidth: "300px" }}>
              <InfoLine>{contact.customer.name}</InfoLine>
              <InfoLine>{contact.customer.email}</InfoLine>
              <InfoLine>{contact.customer.phone}</InfoLine>
            </InfoWrap>
            <InfoWrap style={{ fontWeight: 600 }}>{contact.subject}</InfoWrap>
            <InfoWrap style={{ minWidth: "480px" }}>{contact.comment}</InfoWrap>
            <InfoWrap>
              <StatusButton
                style={{
                  backgroundColor: contact.archived ? "#e8ffee" : "#FFEDEC",
                  color: contact.archived ? "#5ad07a" : "#E23428",
                  maxWidth: "130px",
                }}
              >
               { contact.archived ? "Archived" : "Not Archived"}
              </StatusButton>
            </InfoWrap>
          </RowWrapper>
        ))}
      </ContentWrapper>
    </>
  );
};
