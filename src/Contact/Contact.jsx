import React, { useEffect, useState } from "react";
import { PageWrapper } from "../GeneralComponents";
import { CommentsContainer } from "../Dashboard/Dashboard";
import { Comments } from "../Components/CommentsPreview";
import { ButtonFilter, ButtonsContainer, FilterContainer, OptionSelect, OuterContainer, SelectorFilter, TableContainer } from "../Rooms/Rooms";
import { Floater } from "../Bookings/Bookings";
import { Hourglass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { contactsInfo, contactstatusinfo } from "../features/Contact/contactSlice";
import { getContactsData } from "../features/Contact/contatctThunks";
import { ContactsTableTitles } from "../Components/ContactsTable/ContactsTableTitles";
import { ContactTableContent } from "../Components/ContactsTable/ContactsTable";

export const Contact = () => {
  const infoContacts = useSelector(contactsInfo);
  const statusInfo = useSelector(contactstatusinfo);
  const [currenContacts, setCurrentContacts] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("All Contacts");
  const [selected, setSelected] = useState("Date");

  useEffect(() => {
    dispatch(getContactsData());
  }, [dispatch]);

  useEffect(() => {
    if (statusInfo === "rejected") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "pending") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "fulfilled") {
      setCurrentStatus(statusInfo);
      setCurrentContacts(infoContacts);
    }
  }, [infoContacts, statusInfo]);

  const filtered = currenContacts.filter((contact) => {
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
            defaultValue="Date"
            onChange={(event) => setSelected(event.target.value)}
          >
            <OptionSelect value="Date">Date (newest)</OptionSelect>
            <OptionSelect value="Oldest">
            Date (oldest)
            </OptionSelect>
          </SelectorFilter>
        </FilterContainer>
        {currentStatus === "fulfilled" ? (
          <>
            <TableContainer>
              <ContactsTableTitles data={filtered} />
              <ContactTableContent data={filtered}/>
            </TableContainer>
          </>
        ) : currentStatus === "rejected" ? (
          alert("not good")
        ) : (
          <Floater>
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#135846", "#e23428"]}
            />
          </Floater>
        )}
      </OuterContainer>
      </PageWrapper>
    </>
  );
};
