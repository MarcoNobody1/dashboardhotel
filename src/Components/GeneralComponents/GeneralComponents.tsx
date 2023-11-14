import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { FC, useContext } from "react";
import { BsTrash3 } from "react-icons/bs";
import { ToggleContext } from "../../Context/ToggleSidebar";
import Swal from "sweetalert2";
import { MagnifyingGlass } from "react-loader-spinner";
import searchIcon from "../../assets/iconSearchBar.png";
import searchIconDark from "../../assets/iconSearchBarDark.png";
import { ThemeContext } from "../../Context/ToggleTheme";
import { DarkProp } from "../../features/Interfaces/Interfaces";

export const Layout = styled.div`
  display: flex;
`;

export const InnerLayout = styled(Layout)`
  flex-direction: column;
  width: 100%;
  transition: all 250ms ease-out;
`;

interface DefaultIconProps {
  $color?: string;
}

export const DefaultIcon = styled.div<DefaultIconProps>`
  font-size: 30px;
  color: ${(props) => props.$color || "#135846"};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const PageWrap = styled.main<DarkProp>`
  padding: 50px;
  min-width: 1474px;
  height: 810px;
  overflow-y: scroll;
  overscroll-behavior: contain;
  transition: all 0.25s ease-in-out;

  &::-webkit-scrollbar {
    width: 10px;
    transition: all 0.25s ease-in-out;
    background-color: ${(props) => (props.dark ? "#202020" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => (props.dark ? "#eef9f2" : "#888")};
    transition: all 0.25s ease-in-out;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-corner {
    border-radius: 15px;
  }
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  const { toggle } = useContext(ToggleContext);
  const { dark } = useContext(ThemeContext);

  return (
    <>
      <PageWrap
        dark={dark.dark}
        style={{
          backgroundColor: dark.dark ? "#171717" : "#f8f8f8",
          margin: toggle.toggle ? "0 auto" : undefined,
          width: toggle.toggle ? "100%" : undefined,
        }}
      >
        {children}
      </PageWrap>
    </>
  );
};

export const CrossIcon = styled(RxCross2)`
  color: #799283;
  position: absolute;
  font-size: 24px;
  right: 30px;
  top: 30px;
  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

interface CommentContainerProps {
  archived?: boolean;
  dark?: boolean;
}

export const CommentContainer = styled.div<CommentContainerProps>`
  border-radius: 20px;
  padding: 30px;
  position: relative;
  opacity: ${(props) => (props.archived ? "0.6" : "1")};
  transition: all 250ms ease-in-out;

  &:hover {
    box-shadow: ${(props) =>
      props.archived
        ? "0"
        : props.dark
        ? "0px 10px 15px #ffffff28"
        : " 0px 16px 30px #00000014"};
  }
`;

export const MessageContent = styled.p`
  text-align: left;
  font: normal normal 300 12px/18px Poppins;
  letter-spacing: 0px;
  overflow: hidden;
  white-space: nowrap;
  max-width: 300px;
  max-height: 70px;
  display: inline-block;
  text-overflow: ellipsis;
  transition: all 0.25s ease-in-out;
`;

export const ModalContent = styled(MessageContent)`
  max-width: 450px;
  max-height: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  text-align: justify;
  white-space: normal;
  padding: 10px 10px 0;
`;

export const ModalContainer = styled(CommentContainer)`
  min-width: 480px;
  min-height: 200px;
  max-width: 500px;
  position: relative;
  z-index: 100;
`;

export const TableTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  text-transform: capitalize;
  border-bottom: 1px solid grey;
`;

export const BookingTitle = styled.p`
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
  min-width: 130px;
`;

export const ContentWrapper = styled(TableTitleWrapper)`
  text-transform: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-bottom: 0;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
  transition: all 250ms ease-out;
  align-items: center;
  position: relative;
  padding: 10px 0;

  &:hover {
    box-shadow: 0px 4px 30px #0000001a;
    transform: scale(1.015);
  }
`;

export const InfoWrap = styled.div`
  width: 130px;
  text-align: left;
`;

export const FullNameGuest = styled.p`
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #393939;
`;

export const CheckIn = styled(FullNameGuest)`
  font: normal normal 500 16px/25px Poppins;
`;

export const OrderDate = styled(FullNameGuest)``;

export const StatusDiv = styled.div`
  font: normal normal 500 14px/25px Poppins;
  border-radius: 12px;
  letter-spacing: 0px;
  padding: 13px 26px;
  text-align: center;
  text-transform: capitalize;
`;

export const TrashIcon = styled(BsTrash3)`
  font-size: 20px;
  position: absolute;
  top: 27.5px;
  right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

export const Floater = styled.div`
  position: absolute;
  top: ${(props) =>
    props.datatype === "contacts"
      ? "5%"
      : props.datatype === "bookings"
      ? "-30%"
      : props.datatype === "users"
      ? "-12%"
      : props.datatype === "roomtrash"
      ? "-10%"
      : "25%"};
  right: ${(props) =>
    props.datatype === "contacts"
      ? "-17%"
      : props.datatype === "rooms"
      ? "-11%"
      : props.datatype === "roomtrash"
      ? "-10%"
      : "-15%"};
`;

const PendingWrapper = styled.div`
  width: 100%;
  min-height: 131px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SimpleMessage = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

export const RenderError: FC = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Something's Wrong!",
    text: "Please refresh the page",
    timer: 2500,
    showConfirmButton: false,
    timerProgressBar: true,
  });

  return <SimpleMessage>Please refresh the page</SimpleMessage>;
};

export const RenderGlassLoading: FC = () => {
  return (
    <PendingWrapper>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#517A6F"
      />
    </PendingWrapper>
  );
};

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 55px;
`;

export const TableContainer = styled.div<DarkProp>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.dark ? "#202020" : "#fff")};
  padding: 21px;
  transition: all 250ms ease-in-out;
`;

interface ButtonsContainerProps {
  user?: boolean;
}

export const ButtonsContainer = styled(FilterContainer)<ButtonsContainerProps>`
  gap: 10px;
  padding: 5px;
  padding-bottom: 0;
  margin-right: ${(props) => (props.user ? 0 : "250px")};
  border-bottom: 1px solid #d4d4d4;
`;

export const ButtonFilter = styled.button`
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

export const SearchInput = styled.input<DarkProp>`
  min-width: 427px;
  max-height: 60px;
  border-radius: 10px;
  text-align: right;
  font: normal normal 300 14px/25px Poppins;
  padding: 5px 42px 0px 0;
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-color: transparent;
  transition: all 250ms ease-in-out;
  color: ${(props) => (props.dark ? "#41ebbd" : "#799283")};
  border: ${(props) =>
    props.dark ? "2px solid #41ebbd" : "2px solid #135846"};
  background-image: ${(props) =>
    props.dark ? `url(${searchIconDark})` : `url(${searchIcon})`};
`;

export const UserSearchInput = styled(SearchInput)<DarkProp>`
  min-width: 250px;
`;

export const OptionSelect = styled.option<DarkProp>`
  font: normal normal 400 16px/25px Poppins;
`;

export const SelectorFilter = styled.select<DarkProp>`
  min-width: 150px;
  max-height: 60px;
  background-color: transparent;
  border-radius: 12px;
  padding-left: 5px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#41ebbd" : "#135846")};
  border: ${(props) =>
    props.dark ? "2px solid #41ebbd" : "2px solid #135846"};
  transition: all 250ms ease-in-out;

  & ${OptionSelect} {
    background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  }
`;

export const AddRoomButton = styled.button`
  text-align: center;
  font: normal normal 500 16px/10px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 12px;
  padding: 16px 55px;
  width: 400px;
  border: none;
  transition: all 250ms ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const AddUserButton = styled(AddRoomButton)`
  font: normal normal 500 14px/10px Poppins;
  padding: 16px 55px;
  width: 400px;
`;

export const ButtonAdNew = styled(AddRoomButton)`
  position: absolute;
  bottom: 30px;
  left: 35%;
`;

export const AdNewContainer = styled.td<DarkProp>`
  background-color: ${(props) => (props.dark ? "#202020" : "#FFF")};
  min-width: 1300px;
  min-height: 700px;
  border: 1px solid #135846;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 4px;
  padding: 30px;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 100;
`;

export const NewDataTitle = styled.p<DarkProp>`
  text-align: center;
  display: inline-block;
  font-weight: 500;
  font-size: 36px;
  letter-spacing: 0px;
  color: ${(props) => (props.dark ? "#FFF" : "rgb(38, 38, 38)")};
  flex: 1;
`;

export const UpdatingTitle = styled(NewDataTitle)<DarkProp>`
  font-weight: 400;
  font-size: 30px;
  font-style: italic;
  color: ${(props) => (props.dark ? "#41ebbd" : "#202020")};
`;

export const CommentWrapper = styled.div<DarkProp>`
  height: 100px;
  max-width: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 10px;

  &::-webkit-scrollbar {
    width: 6px;
    transition: all 0.25s ease-in-out;
    background-color: ${(props) => (props.dark ? "#202020" : "#f1f1f1")};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => (props.dark ? "#eef9f2" : "#888")};
    transition: all 0.25s ease-in-out;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-corner {
    border-radius: 15px;
  }
`;

