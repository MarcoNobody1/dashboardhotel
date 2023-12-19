import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowsFullscreen, BsFillBookmarkCheckFill } from "react-icons/bs";
import {
  CommentContainer,
  MessageContent,
} from "../GeneralComponents/GeneralComponents";
import {
  contactsInfo,
  contactstatusinfo,
} from "../../features/Contact/contactSlice";
import {
  archiveData,
  getContactsData,
} from "../../features/Contact/contactThunks";
import { CommentModal } from "./CommentsModal";
import { renderStatus } from "../GeneralComponents/RenderStatus";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ThemeContext } from "../../Context/ToggleTheme";
import {
  ContactInterface,
  DarkProp,
} from "../../features/Interfaces/Interfaces";
import { ToggleContext } from "../../Context/ToggleSidebar";

interface WrapperProps {
  dark?: boolean | string;
  toggle?: boolean | string;
}

const CommentsWrapper = styled.div<WrapperProps>`
  min-width: 360px;
  min-height: 190px;
  max-width: ${(props) => (props.toggle ? "1805px" : "1400px")};
  overflow-x: scroll;
  display: flex;
  gap: 40px;
  padding-bottom: 15px;
  transition: all 0.25s ease-in-out;

  &::-webkit-scrollbar {
    height: 10px;
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

const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

interface ReadIconProps {
  archived: string;
}

const ReadIcon = styled(BsFillBookmarkCheckFill)<ReadIconProps>`
  color: ${(props) => (props.archived === "true" ? "#5ad07a" : "#e23428")};
  transition: all 150ms ease-in;
`;

const FullscreenIcon = styled(BsArrowsFullscreen)`
  transition: all 250ms ease-in;

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
`;

const FullName = styled.h5`
  text-align: left;
  font: normal normal 600 16px/25px Poppins;
  letter-spacing: 0px;
  transition: all 0.25s ease-in-out;
`;

const EmailAddress = styled.p`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
`;

const PhoneNumber = styled(EmailAddress)`
  font: normal normal normal 10px/21px Poppins;
  margin-bottom: 10px;
`;

const Subject = styled(FullName)`
  font: normal normal 600 14px/25px Poppins;
  text-align: right;
  margin-bottom: 10px;
  transition: all 0.25s ease-in-out;
`;

export const Comments: FC = () => {
  const infoContacts = useAppSelector(contactsInfo);
  const statusInfo = useAppSelector(contactstatusinfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const dispatch = useAppDispatch();
  const { dark } = useContext(ThemeContext);
  const { toggle } = useContext(ToggleContext);

  useEffect(() => {
    dispatch(getContactsData());
  }, [dispatch]);

  const handleOpenModal = (contact: ContactInterface) => {
    setIsModalOpen(true);
    setCurrentId(contact._id);

    if (!contact.archived) {
      const updatedContact = {
        ...contact,
        archived: !contact.archived,
      };
      dispatch(archiveData(updatedContact));
    }
  };

  const data = () => {
    return (
      <>
        {infoContacts.map((contact, index) => (
          <CommentContainer
            key={index}
            dark={dark.dark}
            style={{
              backgroundColor: dark.dark ? "#202020" : "#FFF",
              border: dark.dark ? "1px solid #3D3D3D" : "1px solid #ebebeb",
            }}
            archived={contact.archived}
          >
            <>
              <FullName style={{ color: dark.dark ? "#FFF" : "#262626" }}>
                {contact.name}
              </FullName>
              <IconWrapper>
                <ReadIcon archived={contact.archived.toString()} />
                <FullscreenIcon
                  style={{ color: dark.dark ? "#41ebbd" : "#135846" }}
                  onClick={() => handleOpenModal(contact)}
                />
              </IconWrapper>
              <EmailAddress
                style={{ color: dark.dark ? "#41ebbd" : "#799283" }}
              >
                {contact.email}
              </EmailAddress>
              <PhoneNumber style={{ color: dark.dark ? "#41ebbd" : "#799283" }}>
                {contact.phone}
              </PhoneNumber>
              <Subject style={{ color: dark.dark ? "#FFF" : "#262626" }}>
                {contact.subject}
              </Subject>
              <MessageContent style={{ color: dark.dark ? "#FFF" : "#6e6e6e" }}>
                {contact.comment}
              </MessageContent>
            </>
          </CommentContainer>
        ))}
      </>
    );
  };

  return (
    <>
      <CommentsWrapper
        dark={dark.dark}
        toggle={toggle.toggle}
        style={{ backgroundColor: dark.dark ? "#202020" : "#fff" }}
      >
        {renderStatus(statusInfo, data)}
      </CommentsWrapper>
      {isModalOpen && (
        <CommentModal
          idContact={currentId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
