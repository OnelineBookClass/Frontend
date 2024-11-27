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
    height: clamp(120px, 15vw, 160px);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: #343e60;
    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

const RoomThumbnail = styled.img`
    width: clamp(80px, 15vw, 100px);
    height: clamp(120px, 15vw, 160px);
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
`;

const RoomInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    padding: 5px;
    min-height: 120px;
`;

const RoomTitle = styled.div`
    font-size: clamp(1.1rem, 1.5vw, 1.3rem);
    margin-bottom: auto;
    color: #ffffff;
    padding-right: 80px;
`;

const Introduction = styled.p`
    font-size: 0.95rem;
    color: #e5e5e5;
    font-style: italic;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    text-align: center;
`;

const HostName = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.85rem;
    color: #e5e5e5;
    padding: 4px 8px;
`;

const MemberCount = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.85rem;
    color: #e5e5e5;
    padding: 4px 8px;
`;

const TagContainer = styled.div`
    position: absolute;
    padding: 4px 0;
    bottom: 0;
    left: 0;
`;

const Tag = styled.span`
    font-size: 0.8rem;
    color: #e5e5e5;
`;

function RoomItems({ rooms, imageURL = null }) {
    const navigate = useNavigate();
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
                        <HostName>{room.hostNickName}</HostName>
                        <Introduction isDark={isDark}>
                            "{room.intro}"
                        </Introduction>
                        <TagContainer>
                            <Tag isDark={isDark}>#{room.tag}</Tag>
                        </TagContainer>
                        <MemberCount isDark={isDark}>
                            {room.currentParticipants}/{room.maximum}명
                        </MemberCount>
                    </RoomInfo>
                </RoomItem>
            ))}
        </RoomsList>
    );
}

export default RoomItems;
