import { BookingTitle, TableTitleWrapper } from "../../GeneralComponents";

export const TableTitles = (props) => {
    const keys = Object.keys(props.data[0]);
  
    return (
      <>
        <TableTitleWrapper>
          {keys.map((title, index) => (
            <BookingTitle key={index}>{title.replace("_", " ")}</BookingTitle>
          ))}
        </TableTitleWrapper>
      </>
    );
  };