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
                    <ContentText>방제 : {room.roomTitle}</ContentText>
                    <ContentText>토론 시작 일 : {room.createdAt}</ContentText>
                    <ContentText>호스트 : {room.hostNickname}</ContentText>
                </LeftWrapper>
                <RightWrapper>
                    <ContentText>{room.tag}</ContentText>
                </RightWrapper>
            </OuterWrapper>
            <StyledHr />
        </Wrapper>
    )
}

export default RoomListItem;