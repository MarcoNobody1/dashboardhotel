import React from "react";
import { PageWrapper } from "../GeneralComponents";
import { CommentsContainer } from "../Dashboard/Dashboard";
import { Comments } from "../Components/CommentsPreview";

export const Contact = () => {
  return (
    <>
      <PageWrapper>
      <CommentsContainer>
          <Comments />
        </CommentsContainer>
      </PageWrapper>
    </>
  );
};
