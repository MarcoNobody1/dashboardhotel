import React, { FC, useContext, useEffect, useState } from "react";
import { PageWrapper } from "../GeneralComponents/GeneralComponents";
import { CommentsContainer } from "../Dashboard/Dashboard";
import { Comments } from "./CommentsPreview";
import { ButtonFilter, ButtonsContainer, FilterContainer, OptionSelect, OuterContainer, SelectorFilter, TableContainer } from "../GeneralComponents/GeneralComponents";
import { contactsInfo, contactstatusinfo } from "../../features/Contact/contactSlice";
import { getContactsData } from "../../features/Contact/contactThunks";
import DynamicTable from "../GeneralComponents/DynamicTable";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ThemeContext } from "../../Context/ToggleTheme";

export const Contact: FC = () => {
  const infoContacts = useAppSelector(contactsInfo);
  const statusInfo = useAppSelector(contactstatusinfo);
  const dispatch = useAppDispatch();
  const { dark } = useContext(ThemeContext);
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

      return new Date(b.date).getTime() - new Date(a.date).getTime()
    });
  } else if (selected === "Oldest") {
    filtered.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    });
  }

  const RenderTable = () => {
    return (
      <TableContainer dark={dark.dark}>
        <DynamicTable data={filtered} dataType={"contacts"} />
      </TableContainer>
    );
  };

  return (
    <>
      <PageWrapper>
        <CommentsContainer style={{ marginBottom: "25px", backgroundColor: dark.dark ? "#202020" : "#fff" }}>
          <Comments />
        </CommentsContainer>
        <OuterContainer>
          <FilterContainer style={{ justifyContent: "space-between" }}>
            <ButtonsContainer>
              <ButtonFilter
                style={filter === "All Contacts" ? {
                  color: dark.dark ? "#41ebbd" : "#135846",
                  borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
                } : {}}
                onClick={() => setFilter("All Contacts")}
              >
                All Contacts
              </ButtonFilter>
              <ButtonFilter
                style={filter === "Archived" ? {
                  color: dark.dark ? "#41ebbd" : "#135846",
                  borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
                } : {}}
                onClick={() => setFilter("Archived")}
              >
                Archived
              </ButtonFilter>
            </ButtonsContainer>
            <SelectorFilter
              dark={dark.dark}
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
