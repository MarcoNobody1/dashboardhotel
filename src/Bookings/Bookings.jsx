import React, { useEffect, useState } from "react";
import { PageWrapper, TableContent, TableTitles } from "../GeneralComponents";
import styled from "styled-components";
import searchIcon from "../assets/iconSearchBar.png";
import { bookingsData } from "../data/bookingsjson";
import { info, statusinfo } from "../features/Bookings/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../features/Bookings/bookingThunks";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  
  const infoBookings = useSelector(info);
  const statusInfo = useSelector(statusinfo);

  const [currenBookings, setCurrentBookings] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const [filter, setFilter] = useState("All Bookings");
  const [selected, setSelected] = useState("Orderdate");

  useEffect(() => {
    if (statusInfo === "rejected") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "pending") {
      setCurrentStatus(statusInfo);
    } else if (statusInfo === "fulfilled") {
      setCurrentStatus(statusInfo);
      setCurrentBookings(infoBookings);
    }
  }, [infoBookings,statusInfo]);

  const columns = [
    { header: "Full Name", accessor: "guest.nombre" },
    { header: "Order Date", accessor: "order_date" },
    { header: "Check-In Date", accessor: "check_in" },
    { header: "Check-Out Date", accessor: "check_out" },
    { header: "Special Request", accessor: "special_request" },
    { header: "Room Type", accessor: "room" },
    { header: "Status", accessor: "status" },
  ];

  const filtered = currenBookings.filter((booking) => {
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
    <>
      {currentStatus === "fulfilled" ? (
          <PageWrapper>
            <OuterContainer>
              <FilterContainer>
                <ButtonsContainer>
                  <ButtonFilter
                    style={{
                      color: filter === "All Bookings" && "#135846",
                      borderBottom: filter === "All Bookings" && "2px solid #135846",
                    }}
                    onClick={() => setFilter("All Bookings")}
                  >
                    All Bookings
                  </ButtonFilter>
                  <ButtonFilter
                    style={{
                      color: filter === "Checking In" && "#135846",
                      borderBottom: filter === "Checking In" && "2px solid #135846",
                    }}
                    onClick={() => setFilter("Checking In")}
                  >
                    Checking In
                  </ButtonFilter>
                  <ButtonFilter
                    style={{
                      color: filter === "Checking Out" && "#135846",
                      borderBottom: filter === "Checking Out" && "2px solid #135846",
                    }}
                    onClick={() => setFilter("Checking Out")}
                  >
                    Checking Out
                  </ButtonFilter>
                  <ButtonFilter
                    style={{
                      color: filter === "In Progress" && "#135846",
                      borderBottom: filter === "In Progress" && "2px solid #135846",
                    }}
                    onClick={() => setFilter("In Progress")}
                  >
                    In progress
                  </ButtonFilter>
                </ButtonsContainer>
                <SearchInput
                  placeholder="Search booking by client name..."
                  type="text"
                />
                <SelectorFilter
                  defaultValue="Orderdate"
                  onChange={(event) => setSelected(event.target.value)}
                >
                  <OptionSelect value="Guest">Guest</OptionSelect>
                  <OptionSelect value="Orderdate">Order Date</OptionSelect>
                  <OptionSelect value="Checkin">Check in</OptionSelect>
                  <OptionSelect value="Checkout">Check out</OptionSelect>
                </SelectorFilter>
              </FilterContainer>
              <TableContainer>
                <TableTitles data={bookingsData} />
                <TableContent data={filtered} columns={columns} />
              </TableContainer>
            </OuterContainer>
          </PageWrapper>
      ) : currentStatus === "rejected" ? (
        alert("not good")
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};
