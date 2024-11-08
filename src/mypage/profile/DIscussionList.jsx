import React from "react";
import DiscussionListItem from "./DiscussionListItem";
import { DiscussionTitle, ContentWrapper, Wrapper, TitleWrapper, StyledButton  } from "./style/DiscussionListStyle";



function DiscussionList(props) {
  const { discussions } = props;

  return (
    <Wrapper>
      <TitleWrapper>
        <DiscussionTitle>토론 목록</DiscussionTitle>
        <StyledButton variant="error">
          관리하기 ➤
        </StyledButton>
      </TitleWrapper>

      <ContentWrapper>
        {discussions.map((discussion) => (
          <DiscussionListItem key={discussion.id} discussion={discussion} />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

export default DiscussionList;
