import React from "react";
import { DiscussionTitle, ContentWrapper, Wrapper, TitleWrapper  } from "../style/RoomListStyle"
import RoomListItem from "./RoomListItem";

function RoomList({rooms}) {


    return (
        <Wrapper>
            <TitleWrapper>
                <DiscussionTitle>토론 목록</DiscussionTitle>
            </TitleWrapper>
            <ContentWrapper>
                {rooms.map((room) => (
                    <RoomListItem key={room.roomId} room={room} />
                ))}
            </ContentWrapper>
        </Wrapper>
    )
}

export default RoomList;