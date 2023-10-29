import React, { useEffect, useState } from "react";
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
import { UserInterface } from "../../features/Interfaces/Interfaces";
import { UserEditorCreator } from "./UserEditorCreator";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 21px;
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
      <TableContainer>
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
        <AdNewContainer>
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
                color: "#135846",
                borderBottom: "2px solid #135846",
              } : {}}
              onClick={() => setFilter("All Users")}
            >
              All Users
            </ButtonFilter>
            <ButtonFilter
              style={filter === "Active Users" ? {
                color: "#135846",
                borderBottom: "2px solid #135846",
              } : {}}
              onClick={() => setFilter("Active Users")}
            >
              Active Users
            </ButtonFilter>
            <ButtonFilter
              style={filter === "Inactive Users" ? {
                color: "#135846",
                borderBottom: "2px solid #135846",
              } : {}}
              onClick={() => setFilter("Inactive Users")}
            >
              Inactive Users
            </ButtonFilter>
          </ButtonsContainer>
          <AddUserButton onClick={() => setIsModalOpen(true)}>
            + New User
          </AddUserButton>
          {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
          <UserSearchInput
            name="searchUsersInput"
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search user by name..."
            type="text"
          />
          <SelectorFilter
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
