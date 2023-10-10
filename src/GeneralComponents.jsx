import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { BsTrash3 } from "react-icons/bs";
import { ToggleContext } from "./Sidebar/ToggleSidebar";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";

export const Layout = styled.div`
  display: flex;
`;

export const InnerLayout = styled(Layout)`
  flex-direction: column;
  width: 100%;
  transition: all 250ms ease-out;
`;

export const DefaultIcon = styled.div.attrs((props) => ({
  $color: props.$color || "#135846",
}))`
  font-size: 24px;
  color: ${(props) => props.$color};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const PageWrap = styled.main`
  background-color: #f8f8f8;
  height: 810px;
  padding: 50px;
  min-width: 1474px;
`;

export const PageWrapper = ({ children }) => {
  const { toggle } = useContext(ToggleContext);
  return (
    <>
      <PageWrap
        style={{
          margin: toggle.toggle && "0 auto",
          width: toggle.toggle && "100%",
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

export const CommentContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  transition: all 250ms ease-in-out;

  &:hover {
    box-shadow: 0px 16px 30px #00000014;
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
  white-space: normal;
`;

export const ModalContainer = styled(CommentContainer)`
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

export const RenderError = () => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: "Something's Wrong!",
    text: "Please refresh the page",
    timer:2500,
    showConfirmButton:false,
    timerProgressBar:true,
  })
};

export const RenderLoading = () => {
  return (
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
  );
};