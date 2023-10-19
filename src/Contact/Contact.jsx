import React, { useEffect, useState } from "react";
import { PageWrapper } from "../GeneralComponents";
import { CommentsContainer } from "../Dashboard/Dashboard";
import { Comments } from "../Components/Contacts/CommentsPreview";
import { ButtonFilter, ButtonsContainer, FilterContainer, OptionSelect, OuterContainer, SelectorFilter, TableContainer } from "../GeneralComponents";
import { useDispatch, useSelector } from "react-redux";
import { contactsInfo, contactstatusinfo } from "../features/Contact/contactSlice";
import { getContactsData } from "../features/Contact/contactThunks";
import DynamicTable from "../Components/DynamicTable";
import { renderStatus } from "../Components/RenderStatus";

export const Contact = () => {
  const infoContacts = useSelector(contactsInfo);
  const statusInfo = useSelector(contactstatusinfo);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("All Contacts");
  const [selected, setSelected] = useState("Date");

  useEffect(() => {
    dispatch(getContactsData());
  }, [dispatch]);


  const filtered = infoContacts.filter((contact) => {
    switch (filter) {
      case "All Contacts":
        return true;
      case "Archived":
        return contact.archived === true;
      default:
        return false;
    }
  });

  if (selected === "Date") {
    filtered.sort((a, b) => {
      
      return new Date(b.date.send_date) - new Date(a.date.send_date)
    });
  } else if (selected === "Oldest") {
    filtered.sort((a, b) => {
      return new Date(a.date.send_date) - new Date(b.date.send_date)
    });
  }

  const RenderTable = () => {
    return (
      <TableContainer>
        <DynamicTable data={filtered} dataType={"contacts"} />
      </TableContainer>
    );
  };

  return (
    <>
      <PageWrapper>
      <CommentsContainer style={{marginBottom:"25px"}}>
          <Comments />
        </CommentsContainer>
        <OuterContainer>
        <FilterContainer style={{justifyContent: "space-between"}}>
          <ButtonsContainer>
            <ButtonFilter
              style={{
                color: filter === "All Contacts" && "#135846",
                borderBottom: filter === "All Contacts" && "2px solid #135846",
              }}
              onClick={() => setFilter("All Contacts")}
            >
              All Contacts
            </ButtonFilter>
            <ButtonFilter
              style={{
                color: filter === "Archived" && "#135846",
                borderBottom: filter === "Archived" && "2px solid #135846",
              }}
              onClick={() => setFilter("Archived")}
            >
              Archived
            </ButtonFilter>
          </ButtonsContainer>
          <SelectorFilter
          name="filterContactSelector"
            defaultValue="Date"
            onChange={(event) => setSelected(event.target.value)}
          >
            <OptionSelect value="Date">Date (newest)</OptionSelect>
            <OptionSelect value="Oldest">
            Date (oldest)
            </OptionSelect>
          </SelectorFilter>
        </FilterContainer>
        {renderStatus(statusInfo, RenderTable)}
      </OuterContainer>
      </PageWrapper>
    </>
  );
};
