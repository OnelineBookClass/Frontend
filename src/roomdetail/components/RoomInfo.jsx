import React from "react";
import styled from "styled-components";
import {
    RoomHeader,
    BookInfo,
    BookCover,
    Title,
    Author,
    Tag,
    InfoContainer,
    InfoItem,
    Label,
    Value,
    JoinButton,
    BookCoverWrapper,
    BookCoverOverlay,
    InfoContent,
    Description,
    TagContainer,
} from "../styles/RoomDetailPage.style";

const RoomTitle = styled.div`
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: bold;
    margin-bottom: 10px;
    color: #0d142d;
`;

const RoomInfo = ({ roomDetail, onJoin, participating }) => {
    const isRoomFull = roomDetail.currentParticipants >= roomDetail.maximum;

    return (
        <RoomHeader>
            <BookInfo>
                <BookCoverWrapper>
                    <BookCover
                        src={roomDetail.book.cover}
                        alt={roomDetail.book.title}
                    />
                    <Title>{roomDetail.book.title}</Title>
                    <Author>{roomDetail.book.author}</Author>
                    <BookCoverOverlay />
                </BookCoverWrapper>

                <InfoContainer>
                    <RoomTitle>{roomDetail.roomTitle}</RoomTitle>
                    <TagContainer>
                        <Tag>{roomDetail.tag}</Tag>
                    </TagContainer>

                    <InfoContent>
                        <InfoItem>
                            <Label>방장</Label>
                            <Value>{roomDetail.hostNickName}</Value>
                        </InfoItem>
                        <InfoItem>
                            <Label>방장 평점</Label>
                            <Value isHostRating>
                                {roomDetail.userRating}/5
                            </Value>
                        </InfoItem>
                        <InfoItem>
                            <Label>참여 인원</Label>
                            <Value isParticipants>
                                {roomDetail.currentParticipants}/
                                {roomDetail.maximum}
                            </Value>
                        </InfoItem>
                    </InfoContent>

                    <Description>" {roomDetail.intro} "</Description>

                    <JoinButton
                        onClick={onJoin}
                        disabled={!participating && isRoomFull}
                    >
                        {participating
                            ? "채팅방 입장하기"
                            : isRoomFull
                            ? "방이 가득 찼습니다"
                            : "참여하기"}
                    </JoinButton>
                </InfoContainer>
            </BookInfo>
        </RoomHeader>
    );
};

export default RoomInfo;
