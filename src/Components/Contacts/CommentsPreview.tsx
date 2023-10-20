import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowsFullscreen, BsFillBookmarkCheckFill } from "react-icons/bs";
import { CommentContainer, MessageContent } from "../../GeneralComponents";
import {
  contactsInfo,
  contactstatusinfo,
} from "../../features/Contact/contactSlice";
import {
  archiveData,
  getContactsData,
} from "../../features/Contact/contactThunks";
import { CommentModal } from "./CommentsModal";
import { renderStatus } from "../RenderStatus";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const CommentsWrapper = styled.div`
  min-width: 360px;
  min-height: 190px;
  background-color: #fff;
  display: flex;
  gap: 40px;
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
  color: #135846;
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
  color: #262626;
`;

const EmailAddress = styled.p`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #799283;
`;

const PhoneNumber = styled(EmailAddress)`
  font: normal normal normal 10px/21px Poppins;
  margin-bottom: 10px;
`;

const Subject = styled(FullName)`
  font: normal normal 600 14px/25px Poppins;
  text-align: right;
  margin-bottom: 10px;
`;

interface Comment {
  archived: boolean;
  date: {
    id: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  subject: string;
  comment: string;
}

export const Comments: FC = () => {
  const infoContacts = useAppSelector(contactsInfo);
  const statusInfo = useAppSelector(contactstatusinfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContactsData());
  }, [dispatch]);

  const handleOpenModal = (id: string, archived: boolean) => {
    setIsModalOpen(true);
    setCurrentId(id);

    if (!archived) {
      dispatch(archiveData(id));
    }
  };

  const data = () => {
    return (
      <>
        {infoContacts.map((contact) => (
          <CommentContainer archived={contact.archived}  key={contact.date.id}>
            <>
              <FullName>{contact.customer.name}</FullName>
              <IconWrapper>
                <ReadIcon archived={contact.archived.toString()} /> 
                <FullscreenIcon
                  onClick={() =>
                    handleOpenModal(contact.date.id, contact.archived)
                  }
                />
              </IconWrapper>
              <EmailAddress>{contact.customer.email}</EmailAddress>
              <PhoneNumber>{contact.customer.phone}</PhoneNumber>
              <Subject>{contact.subject}</Subject>
              <MessageContent>{contact.comment}</MessageContent>
            </>
          </CommentContainer>
        ))}
      </>
    );
  };

  return (
    <>
      <CommentsWrapper>{renderStatus(statusInfo, data)}</CommentsWrapper>
      {isModalOpen && (
        <CommentModal
          idContact={currentId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
