import { ReactNode } from "react";
import { RenderError, RenderGlassLoading } from "./GeneralComponents";
import { useLocation, useParams } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { get1RoomData } from "../../features/Rooms/roomThunks";
import { get1Data } from "../../features/Bookings/bookingThunks";

export const renderStatus = (
  status: string,
  data: () => ReactNode
): ReactNode => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  if (status === "fulfilled") {
    return data();
  } else if (status === "rejected") {
    return <RenderError />;
  } else if (status === "pending") {
    return <RenderGlassLoading />;
  } else if (status === "idle") {
    if (location.pathname.startsWith("/rooms/") && id) {
      dispatch(get1RoomData(id));
    } else if (location.pathname.startsWith("/bookings/") && id) {
      dispatch(get1Data(id));
    }
  }
};
