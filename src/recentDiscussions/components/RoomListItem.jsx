import React from "react";
import {
    Wrapper,
    OuterWrapper,
    StyledHr,
    LeftWrapper,
    RightWrapper,
    BookInfo,
    RoomInfo,
    BookImage,
    BookTitle,
    AuthorText,
    RoomTitle,
    IntroText,
    ParticipantsInfo,
    TagBadge,
    InfoSection,
} from "../style/RoomListItemStyle";
import { useNavigate } from "react-router-dom";

function RoomListItem({ room }) {
    const navigate = useNavigate();
    return (
        <Wrapper onClick={() => navigate(`/roomdetail/${room.roomId}`)}>
            <OuterWrapper>
                <BookImage
                    src={room.bookInfo.thumbnail}
                    alt={room.bookInfo.bookTitle}
                />
                <InfoSection>
                    <LeftWrapper>
                        <BookInfo>
                            <BookTitle>{room.bookInfo.bookTitle}</BookTitle>
                            <AuthorText>{room.bookInfo.author}</AuthorText>
                        </BookInfo>
                        <RoomInfo>
                            <RoomTitle>{room.roomTitle}</RoomTitle>
                            <IntroText>{room.intro}</IntroText>
                            <ParticipantsInfo>
                                참여인원: {room.currentParticipants}/
                                {room.maximum}명
                            </ParticipantsInfo>
                        </RoomInfo>
                    </LeftWrapper>
                    <RightWrapper>
                        <TagBadge>{room.tag}</TagBadge>
                    </RightWrapper>
                </InfoSection>
            </OuterWrapper>
            <StyledHr />
        </Wrapper>
    );
}

export default RoomListItem;
