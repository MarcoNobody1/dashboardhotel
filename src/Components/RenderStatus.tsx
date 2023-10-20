import { ReactNode } from "react";
import { RenderError, RenderGlassLoading } from "../GeneralComponents";

export const renderStatus = (status:string, data: () => ReactNode):ReactNode => {
    if (status === "fulfilled") {
      return (
        data()
      );
    } else if (status === "rejected") {
      return <RenderError/>;
    } else {
      return <RenderGlassLoading />;
    }
  };