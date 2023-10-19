import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { FC, useContext } from "react";
import { BsTrash3 } from "react-icons/bs";
import { ToggleContext } from "./Sidebar/ToggleSidebar";
import Swal from "sweetalert2";
import { MagnifyingGlass } from "react-loader-spinner";
import searchIcon from "./assets/iconSearchBar.png";

export const formatDate = (inputDate: Date | string) => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date: Date;

  if (typeof inputDate === 'string') {
    date = new Date(inputDate);
  } else if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    throw new Error('Invalid input date format');
  }

  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();

  const month = months[monthIndex];

  const daySuffix = getDaySuffix(day);

  return `${month} ${day}${daySuffix}, ${year}`;
};

const getDaySuffix = (day:number):string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

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
  font-size: 24px;
  color: ${(props) => props.$color || '#135846'};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const PageWrap = styled.main`
  background-color: #f8f8f8;
  padding: 50px;
  min-width: 1474px;
  max-height: 810px;
  overflow-y: scroll;
  overscroll-behavior: contain;
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  const { toggle } = useContext(ToggleContext);

  return (
    <>
      <PageWrap
        style={{
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
}

export const CommentContainer= styled.div<CommentContainerProps>`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  opacity: ${(props) => (props.archived ? "0.6" : "1")};
  transition: all 250ms ease-in-out;

  &:hover {
    box-shadow: ${(props) =>
      props.archived ? "0" : " 0px 16px 30px #00000014"};
  }
`;

export const MessageContent = styled.p`
  text-align: left;
  font: normal normal 300 12px/18px Poppins;
  letter-spacing: 0px;
  color: #6e6e6e;
  overflow: hidden;
  white-space: nowrap;
  max-width: 300px;
  max-height: 70px;
  display: inline-block;
  text-overflow: ellipsis;
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
  top: -10%;
  right: -15%;
`;

const PendingWrapper = styled.div`
  width: 100%;
  min-height: 131px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RenderError = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Something's Wrong!",
    text: "Please refresh the page",
    timer: 2500,
    showConfirmButton: false,
    timerProgressBar: true,
  });
};

export const RenderGlassLoading = () => {
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

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 21px;
`;

interface ButtonsContainerProps{
  user: boolean
}

export const ButtonsContainer = styled(FilterContainer)<ButtonsContainerProps>`
  gap: 10px;
  padding: 5px;
  padding-bottom: 0;
  margin-right:  ${(props) => (props.user ? 0 :"250px")};
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

export const SearchInput = styled.input`
  min-width: 427px;
  max-height: 60px;
  border-radius: 10px;
  border: 1px solid #135846;
  text-align: right;
  font: normal normal 300 14px/25px Poppins;
  padding: 5px 40px 0px 0;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: right 10px center;
`;

export const UserSearchInput = styled(SearchInput)`
 min-width: 250px;
`;

export const SelectorFilter = styled.select`
  min-width: 150px;
  max-height: 60px;
  background-color: #fff;
  border: 1px solid #135846;
  color: #135846;
  border-radius: 12px;
  padding-left: 5px;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
`;

export const OptionSelect = styled.option`
  font: normal normal 400 16px/25px Poppins;
`;

export const AddRoomButton = styled.button`
  background-color: #135846;
  text-align: center;
  font: normal normal 500 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 12px;
  padding: 13px 55px;
  border: none;
  transition: all 250ms ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const AddUserButton = styled(AddRoomButton)`
  font: normal normal 500 14px/10px Poppins;
  padding: 13px 55px;
  width: 400px;
`;

export const ButtonAdNew = styled(AddRoomButton)`
  position: absolute;
  bottom: 30px;
  left: 42%;
`;

export const AdNewContainer = styled.div`
  background-color: #ffffff;
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

export const NewDataTitle = styled.p`
  text-align: center;
  display: inline-block;
  font-weight: 600;
  font-size: 40px;
  letter-spacing: 0px;
  color: rgb(38, 38, 38);
  flex: 1;
`;