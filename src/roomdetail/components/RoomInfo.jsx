import React from "react";
import {
    RoomHeader,
    BookInfo,
    BookCover,
    BookDetails,
    Title,
    Author,
    Tag,
    HostInfo,
    InfoContainer,
    InfoItem,
    Label,
    Value,
    JoinButton,
} from "../styles/RoomDetailPage.style";

const RoomInfo = ({ roomDetail, onJoin }) => {
    return (
        <>
            <RoomHeader>
                <BookInfo>
                    <BookCover
                        src={roomDetail.book.cover}
                        alt={roomDetail.book.title}
                    />
                    <BookDetails>
                        <Title>{roomDetail.book.title}</Title>
                        <Author>{roomDetail.book.author}</Author>
                        <Tag>{roomDetail.tag}</Tag>
                    </BookDetails>
                </BookInfo>
                <HostInfo>방장: {roomDetail.hostNickName}</HostInfo>
            </RoomHeader>

            <InfoContainer>
                <InfoItem>
                    <Label>참여 인원</Label>
                    <Value isParticipants>
                        {roomDetail.currentParticipants} / {roomDetail.maximum}
                        명
                    </Value>
                </InfoItem>
                <InfoItem>
                    <Label>소개</Label>
                    <Value>{roomDetail.intro}</Value>
                </InfoItem>
            </InfoContainer>

            <JoinButton
                onClick={onJoin}
                disabled={roomDetail.currentParticipants >= roomDetail.maximum}
            >
                {roomDetail.currentParticipants >= roomDetail.maximum
                    ? "방이 가득 찼습니다"
                    : "참여하기"}
            </JoinButton>
        </>
    );
};

export default RoomInfo;
