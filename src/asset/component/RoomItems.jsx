import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const RoomsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const RoomItem = styled.div`
    display: flex;
    border: ${({ isDark }) =>
        `2px solid ${
            isDark ? "rgb(255, 255, 255, 0.1)" : "rgb(0, 0, 0, 0.1)"
        }`};
    padding: 1px;
    border-left: ${({ isDark }) =>
        isDark ? "none" : "2px solid rgb(0, 0, 0, 0.1)"};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    /* background-color: rgba(13, 20, 45, 0.7); */

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

const RoomThumbnail = styled.img`
    width: 100px;
    height: 160px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
`;

const RoomInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 160px;
    padding-top: 5px;
`;

const RoomTitle = styled.div`
    font-size: 1.3rem;
    margin-bottom: auto;
`;

const BookInfoContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 10px;
`;

const BookTitle = styled.div`
    display: flex;
    align-items: flex-end;
    font-size: 1rem;
    margin: 0 0 1px 0;
    color: ${({ isDark }) => (isDark ? "#e5e5e5" : "#4f4f4f")};
`;

const Author = styled.span`
    display: flex;
    align-items: flex-end;
    padding-bottom: 2px;
    font-size: 0.75rem;
    color: #a7a7a7;
`;

const Introduction = styled.p`
    font-size: 0.95rem;
    color: ${({ isDark }) => (isDark ? "#e5e5e5" : "#000000")};
    font-style: italic;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    text-align: center;
`;

const MemberCount = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.85rem;
    color: ${({ isDark }) => (isDark ? "#e5e5e5" : "#000000")};
    padding: 4px 8px;
`;

const HostName = styled.span`
    margin-right: 10px;
`;

const TagContainer = styled.div`
    position: absolute;
    padding: 4px 0;
    bottom: 0;
    left: 0;
`;

const Tag = styled.span`
    font-size: 0.8rem;
    color: ${({ isDark }) => (isDark ? "#e5e5e5" : "#000000")};
`;

function RoomItems({ rooms, imageURL = null }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const { isDark } = useTheme();
    const handleRoomClick = (roomId) => {
        navigate(`/roomdetail/${roomId}`);
    };

    return (
        <RoomsList>
            {rooms.map((room) => (
                <RoomItem
                    key={room.roomId}
                    onClick={() => handleRoomClick(room.roomId)}
                    isDark={isDark}
                >
                    <RoomThumbnail
                        src={imageURL || room.thumbnail}
                        alt={room.title || room.roomTitle}
                    />
                    <RoomInfo>
                        <RoomTitle>{room.title || room.roomTitle}</RoomTitle>
                        <BookInfoContainer>
                            <BookTitle isDark={isDark}>
                                {room.bookTitle}
                            </BookTitle>
                            <Author isDark={isDark}>{room.author}</Author>
                        </BookInfoContainer>
                        <Introduction isDark={isDark}>
                            "{room.intro}"
                        </Introduction>
                        <TagContainer>
                            <Tag isDark={isDark}>#{room.tag}</Tag>
                        </TagContainer>
                        <MemberCount isDark={isDark}>
                            <HostName>모임장: {room.hostNickName}</HostName>
                            인원: {room.currentParticipants}/{room.maximum}명
                        </MemberCount>
                    </RoomInfo>
                </RoomItem>
            ))}
        </RoomsList>
    );
}

export default RoomItems;
