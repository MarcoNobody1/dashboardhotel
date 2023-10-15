import { RenderError, RenderGlassLoading } from "../GeneralComponents";

export const renderStatus = (status, data) => {
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