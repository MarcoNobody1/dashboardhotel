import React, { useContext, useEffect, useState } from "react";
import { ButtonFilter, ButtonsContainer, FilterContainer, OptionSelect, OuterContainer, PageWrapper, SearchInput, SelectorFilter, TableContainer } from "../GeneralComponents/GeneralComponents";
import { info, statusinfo } from "../../features/Bookings/bookingSlice";
import { getData } from "../../features/Bookings/bookingThunks";
import DynamicTable from "../GeneralComponents/DynamicTable";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingInterface } from "../../features/Interfaces/Interfaces";
import { ThemeContext } from "../../Context/ToggleTheme";

export const Bookings = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const infoBookings = useAppSelector(info);
  const statusInfo = useAppSelector(statusinfo);
  const { dark } = useContext(ThemeContext);
  const [currenBookings, setCurrentBookings] = useState<BookingInterface[]>([]);
  const [filter, setFilter] = useState("All Bookings");
  const [selected, setSelected] = useState("Orderdate");

  useEffect(() => {
    setCurrentBookings(infoBookings);
  }, [infoBookings]);

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
      return dateB.getTime() - dateA.getTime();
    });
  } else if (selected === "Checkin") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.check_in);
      const dateB = new Date(b.check_in);
      return dateB.getTime() - dateA.getTime();
    });
  } else if (selected === "Checkout") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.check_out);
      const dateB = new Date(b.check_out);
      return dateB.getTime() - dateA.getTime();
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

  const handleSearch = (input: string) => {
    const searchTerm = input.toLowerCase();
    if (searchTerm === "") {
      setCurrentBookings(infoBookings);
    } else {
      const filteredData = infoBookings.filter((booking) => {
        const fullName =
          `${booking.guest.nombre} ${booking.guest.apellidos}`.toLowerCase();
        return fullName.includes(searchTerm);
      });

      setCurrentBookings(filteredData);
    }
  };

  const RenderTable = () => {
    return (
      <TableContainer dark={dark.dark}>
        <DynamicTable data={filtered} dataType={"bookings"} />
      </TableContainer>
    );
  };

  return (
    <>
      <PageWrapper>
        <OuterContainer>
          <FilterContainer>
            <ButtonsContainer>
              <ButtonFilter
                style={filter === "All Bookings" ? {
                  color: dark.dark ? "#41ebbd" : "#135846",
                  borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
                } : {}}
                onClick={() => setFilter("All Bookings")}
              >
                All Bookings
              </ButtonFilter>
              <ButtonFilter
                style={filter === "Checking In" ? {
                  color: dark.dark ? "#41ebbd" : "#135846",
                  borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
                } : {}}
                onClick={() => setFilter("Checking In")}
              >
                Checking In
              </ButtonFilter>
              <ButtonFilter
                style={filter === "Checking Out" ? {
                  color: dark.dark ? "#41ebbd" : "#135846",
                  borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
                } : {}}
                onClick={() => setFilter("Checking Out")}
              >
                Checking Out
              </ButtonFilter>
              <ButtonFilter
                style={filter === "In Progress" ? {
                  color: dark.dark ? "#41ebbd" : "#135846",
                  borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
                } : {}}
                onClick={() => setFilter("In Progress")}
              >
                In progress
              </ButtonFilter>
            </ButtonsContainer>
            <SearchInput
              dark={dark.dark}
              name="searchBookingInput"
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search booking by client name..."
              type="text"
            />
            <SelectorFilter
              dark={dark.dark}
              name="filterBookingSelector"
              defaultValue="Orderdate"
              onInput={(event) => {
                const selectedValue = (event.target as HTMLSelectElement).value;
                setSelected(selectedValue);
              }}
            >
              <OptionSelect value="Guest">Guest</OptionSelect>
              <OptionSelect value="Orderdate">Order Date</OptionSelect>
              <OptionSelect value="Checkin">Check in</OptionSelect>
              <OptionSelect value="Checkout">Check out</OptionSelect>
            </SelectorFilter>
          </FilterContainer>
          {renderStatus(statusInfo, RenderTable)}
        </OuterContainer>
      </PageWrapper>
    </>
  );
};
