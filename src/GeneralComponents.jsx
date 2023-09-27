import styled from "styled-components";

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

export const PageWrapper = styled.main`
  background-color: #f8f8f8;
  height: 810px;
  padding: 50px;
  margin-left: 345px;
  min-width: 1474px;
`;

export const Notification = (props) => {
  const ImageWrapper = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    background-color: #ffedec;
    border-radius: 8px;
    transition: all 250ms ease-out;
    margin-right: 22px;
  `;

  const NotificationIcon = styled(DefaultIcon)`
    color: #e23428;
  `;

  const NotificationOuter = styled.div`
    width: 340px;
    background: #ffffff;
    box-shadow: 0px 4px 4px #00000005;
    border-radius: 12px;
    padding: 30px;
    display: inline-block;
    margin-right: 20px;
    transition: all 250ms ease-out;
    cursor: pointer;

    &:hover{
      transform: scale(1.05);
    }

    &:hover ${ImageWrapper} {
      background-color: #e23428;
    }

    &:hover ${NotificationIcon} {
      color: #fff;
    }
  `;

  const ContentWrapper = styled.div`
    display: inline-block;
  `;

  const Icon = () => <NotificationIcon as={props.icon} />;

  const NotificationNumber = styled.h5`
    text-align: left;
    font: normal normal 600 30px/46px Poppins;
    letter-spacing: 0px;
    color: #393939;
  `;

  const NotificationType = styled.p`
    text-align: left;
    font: normal normal 300 14px/21px Poppins;
    letter-spacing: 0px;
    color: #787878;
  `;

  const NotificationWrapper = styled.div`
    display: flex;
  `;

  return (
    <>
      <NotificationOuter>
        <NotificationWrapper>
          <ImageWrapper>
            <Icon />
          </ImageWrapper>
          <ContentWrapper>
            <NotificationNumber>{props.number}</NotificationNumber>
            <NotificationType>{props.text}</NotificationType>
          </ContentWrapper>
        </NotificationWrapper>
      </NotificationOuter>
    </>
  );
};
