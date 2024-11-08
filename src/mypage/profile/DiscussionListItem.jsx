import React from "react";
import { FixedAvatar } from "./style/UserInfoStyle";
import { Wrapper, OuterWrapper, ContentText, StyledHr, LeftWrapper, RightWrapper} from "./style/DiscussionListItemStyle";


function DiscussionListItem(props) {
    const { discussion } = props;

    return (
        <Wrapper>
            <OuterWrapper>
                <FixedAvatar></FixedAvatar>
                <LeftWrapper>
                    <ContentText>{discussion.content}</ContentText>
                    <ContentText>{discussion.date}</ContentText>
                </LeftWrapper>
                <RightWrapper>
                    <ContentText>AI Summary</ContentText>
                </RightWrapper>
            </OuterWrapper>
            <StyledHr />
        </Wrapper>
    );
}

export default DiscussionListItem;
