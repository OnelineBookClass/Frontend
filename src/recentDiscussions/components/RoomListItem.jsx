import React from "react";
import { Wrapper, OuterWrapper, ContentText, StyledHr, LeftWrapper, RightWrapper}  from "../style/RoomListItemStyle"
import { FixedAvatar } from "../style/RoomInfo"

function RoomListItem(props){

    const {room} = props;
    return(
        <Wrapper>
            <OuterWrapper>
                <FixedAvatar
                 sx={{
                    bgcolor: "white", // 배경색
                    border: "1px solid black", // 테두리 추가
                }}
                >📚</FixedAvatar>
                <LeftWrapper>
                    <ContentText>{room.roomName}</ContentText>
                    <ContentText>인원 : {room.personnel}</ContentText>
                </LeftWrapper>
                <RightWrapper>
                    <ContentText>{room.hashtag}</ContentText>
                </RightWrapper>
            </OuterWrapper>
            <StyledHr />
        </Wrapper>
    )
}

export default RoomListItem;