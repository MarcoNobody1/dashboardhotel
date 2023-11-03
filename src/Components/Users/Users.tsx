import React, { useContext, useEffect, useState } from "react";
import {
  AdNewContainer,
  AddUserButton,
  CrossIcon,
  ModalBackground,
  NewDataTitle,
  PageWrapper,
  UserSearchInput,
} from "../GeneralComponents/GeneralComponents";
import { getUsersData } from "../../features/Users/userThunks";
import { usersInfo, usersStatusinfo } from "../../features/Users/userSlice";
import styled from "styled-components";
import DynamicTable from "../GeneralComponents/DynamicTable";
import {
  ButtonFilter,
  ButtonsContainer,
  FilterContainer,
  OptionSelect,
  OuterContainer,
  SelectorFilter,
} from "../GeneralComponents/GeneralComponents";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FC } from 'react';
import { DarkProp, UserInterface } from "../../features/Interfaces/Interfaces";
import { UserEditorCreator } from "./UserEditorCreator";
import { ThemeContext } from "../../Context/ToggleTheme";

const TableContainer = styled.div<DarkProp>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.dark ? "#202020" : "#fff")};
  padding: 21px;
  transition: all 250ms ease-in-out;
`;

export const Users = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);

  const usersData = useAppSelector(usersInfo);
  const userStatusInfo = useAppSelector(usersStatusinfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<UserInterface[]>([]);
  const [filter, setFilter] = useState("All Users");
  const [selected, setSelected] = useState("Start Date");
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    setCurrentUsers(usersData);
  }, [usersData]);

  const filtered = currentUsers.filter((user) => {
    switch (filter) {
      case "All Users":
        return true;
      case "Active Users":
        return user.activity === "active";
      case "Inactive Users":
        return user.activity === "inactive";
      default:
        return false;
    }
  });

  if (selected === "Start Date") {
    filtered.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateB.getTime() - dateA.getTime();
    });
  } else if (selected === "Name(A-Z)") {
    filtered.sort((a, b) => {
      const nombreA = a.name.username.toUpperCase();
      const nombreB = b.name.username.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
  } else if (selected === "Name(Z-A)") {
    filtered.sort((a, b) => {
      const nombreA = a.name.username.toUpperCase();
      const nombreB = b.name.username.toUpperCase();
      if (nombreA < nombreB) {
        return 1;
      }
      if (nombreA > nombreB) {
        return -1;
      }
      return 0;
    });
  }

  const handleSearch = (input: string) => {
    const searchTerm = input.toLowerCase();
    if (searchTerm === "") {
      setCurrentUsers(usersData);
    } else {
      const filteredData = usersData.filter((user) => {
        const name = user.name.username.toLowerCase();

        return name.includes(searchTerm);
      });

      setCurrentUsers(filteredData);
    }
  };

  const RenderTable = () => {
    return (
      <TableContainer dark={dark.dark}>
        <DynamicTable data={filtered} dataType={"users"} />
      </TableContainer>
    );
  };

  interface ModalParams {
    onClose: () => void
  }

  const Modal: FC<ModalParams> = ({ onClose }) => {
    return (
      <ModalBackground>
        <AdNewContainer dark={dark.dark}>
          <CrossIcon onClick={onClose} />
          <NewDataTitle>Create a New User</NewDataTitle>
          <UserEditorCreator closeModal={onClose} />
        </AdNewContainer>
      </ModalBackground>
    );
  };


  return (
    <PageWrapper>
      <OuterContainer>
        <FilterContainer>
          <ButtonsContainer user>
            <ButtonFilter
              style={filter === "All Users" ? {
                color: dark.dark ? "#41ebbd" : "#135846",
                borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
              } : {}}
              onClick={() => setFilter("All Users")}
            >
              All Users
            </ButtonFilter>
            <ButtonFilter
              style={filter === "Active Users" ? {
                color: dark.dark ? "#41ebbd" : "#135846",
                borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
              } : {}}
              onClick={() => setFilter("Active Users")}
            >
              Active Users
            </ButtonFilter>
            <ButtonFilter
              style={filter === "Inactive Users" ? {
                color: dark.dark ? "#41ebbd" : "#135846",
                borderBottom: dark.dark ? "2px solid #41ebbd" : "2px solid #135846",
              } : {}}
              onClick={() => setFilter("Inactive Users")}
            >
              Inactive Users
            </ButtonFilter>
          </ButtonsContainer>
          <AddUserButton style={{
            backgroundColor: dark.dark ? "#41ebbd" : "#135846",
            color: dark.dark ? "#171717" : "#ffffff",
          }} onClick={() => setIsModalOpen(true)}>
            + New User
          </AddUserButton>
          {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
          <UserSearchInput
            dark={dark.dark}
            name="searchUsersInput"
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search user by name..."
            type="text"
          />
          <SelectorFilter
            dark={dark.dark}
            name="filterUsersSelector"
            defaultValue="Start Date"
            onInput={(event) => {
              const selectedValue = (event.target as HTMLSelectElement).value;
              setSelected(selectedValue);
            }}
          >
            <OptionSelect value="Start Date">Start Date</OptionSelect>
            <OptionSelect value="Name(A-Z)">Name(A-Z)</OptionSelect>
            <OptionSelect value="Name(Z-A)">Name(Z-A)</OptionSelect>
          </SelectorFilter>
        </FilterContainer>
        {renderStatus(userStatusInfo, RenderTable)}
      </OuterContainer>
    </PageWrapper>
  );
};
