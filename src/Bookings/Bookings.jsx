import React, { useState } from "react";
import { PageWrapper, TableContent, TableTitles } from "../GeneralComponents";
import styled from "styled-components";
import searchIcon from "../assets/iconSearchBar.png";
import { bookingsData } from "../data/bookingsjson";

const OuterContainer = styled.div`
  display: flex;
  width: 1474px;
  flex-direction: column;
  gap: 50px;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 55px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 21px;
`;

const ButtonsContainer = styled(FilterContainer)`
  gap: 10px;
  padding: 5px;
  padding-bottom: 0;
  width: auto;
  margin-right: 250px;
  border-bottom: 1px solid #d4d4d4;
`;

const ButtonFilter = styled.button`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #6e6e6e;
  background-color: transparent;
  width: max-content;
  padding: 5px 15px;
  border: none;
  border-bottom: 2px solid transparent;

  &:hover {
    font-weight: 500;
    color: #135846;
    cursor: pointer;
    border-bottom: 2px solid #135846;
  }
`;

const SearchInput = styled.input`
  min-width: 427px;
  max-height: 35px;
  border-radius: 10px;
  border: 1px solid #135846;
  text-align: right;
  font: normal normal 300 14px/25px Poppins;
  padding: 5px 35px 5px 0;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: right 8px center;
`;

const SelectorFilter = styled.select`
  min-width: 150px;
  max-height: 35px;
  background-color: #fff;
  border: 1px solid #135846;
  color: #135846;
  border-radius: 12px;
  padding-left: 5px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
`;

const OptionSelect = styled.option`
  font: normal normal 400 16px/25px Poppins;
`;

export const Bookings = () => {


  const [filter, setFilter] = useState("All Bookings");

  const [selected, setSelected] = useState('Orderdate');

  const filtered = bookingsData.filter((booking) => {
    switch (filter) {
      case "All Bookings":
        return true;
      case "Checking In":
        return booking.status === "Check In";
      case "Checking Out":
        return booking.status === "Check Out";
      case "In Progress":
        return booking.status === "In Progress";
      default:
        return false;
    }
  });

  if (selected === "Orderdate") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return dateB - dateA;
    });
  } else if (selected === "Checkin") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.check_in);
      const dateB = new Date(b.check_in);
      return dateB - dateA;
    });
  } else if (selected === "Checkout") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.check_out);
      const dateB = new Date(b.check_out);
      return dateB - dateA;
    });
  } else if (selected === "Guest") {
    filtered.sort((a, b) => {
      const nombreA = a.guest.nombre.toUpperCase();
      const nombreB = b.guest.nombre.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <PageWrapper>
      <OuterContainer>
        <FilterContainer>
          <ButtonsContainer>
            <ButtonFilter onClick={() => setFilter("All Bookings")}>
              All Bookings
            </ButtonFilter>
            <ButtonFilter onClick={() => setFilter("Checking In")}>
              Checking In
            </ButtonFilter>
            <ButtonFilter onClick={() => setFilter("Checking Out")}>
              Checking Out
            </ButtonFilter>
            <ButtonFilter onClick={() => setFilter("In Progress")}>
              In progress
            </ButtonFilter>
          </ButtonsContainer>
          <SearchInput
            placeholder="Search booking by client name..."
            type="text"
          />
          <SelectorFilter defaultValue="Orderdate" onChange={(event) => setSelected(event.target.value)}>
            <OptionSelect value="Guest">Guest</OptionSelect>
            <OptionSelect value="Orderdate">Order Date</OptionSelect>
            <OptionSelect value="Checkin">Check in</OptionSelect>
            <OptionSelect value="Checkout">Check out</OptionSelect>
          </SelectorFilter>
        </FilterContainer>
        <TableContainer>
          <TableTitles data={bookingsData} />
          <TableContent data={filtered}/>
        </TableContainer>
      </OuterContainer>
    </PageWrapper>
  );
};

