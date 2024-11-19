import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Title } from "../style/TitleStyle";
import { IoIosArrowForward } from "react-icons/io";

const Section = styled.section`
    margin: 20px 0;
`;

const RoomsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const RoomItem = styled.div`
    display: flex;
    border: 1px solid #eee;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

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
    padding: 5px 0;
`;

const RoomTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: #333;
`;

const Author = styled.span`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 8px;
`;

const HostName = styled.span`
    font-size: 0.85rem;
    color: #8e0202;
    margin-bottom: 12px;
`;

const Introduction = styled.p`
    font-size: 0.95rem;
    color: #444;
    font-style: italic;
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MemberCount = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.85rem;
    color: #666;
    background-color: #f5f5f5;
    padding: 4px 8px;
    border-radius: 12px;
`;

function RecentRooms({ rooms }) {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/recent");
    };

    const handleRoomClick = (roomId) => {
        navigate(`/roomdetail/${roomId}`);
    };

    return (
        <Section>
            <Title onClick={handleTitleClick}>
                최신 모임 <IoIosArrowForward />
            </Title>
            <RoomsList>
                {rooms.map((room) => (
                    <RoomItem
                        key={room.roomId}
                        onClick={() => handleRoomClick(room.roomId)}
                    >
                        <RoomThumbnail
                            src={room.thumbnail}
                            alt={room.roomTitle}
                        />
                        <RoomInfo>
                            <RoomTitle>{room.roomTitle}</RoomTitle>
                            <Author>{room.author}</Author>
                            <HostName>모임장: {room.hostNickName}</HostName>
                            <Introduction>"{room.intro}"</Introduction>
                            <MemberCount>
                                {room.currentMember}/{room.maximum}명
                            </MemberCount>
                        </RoomInfo>
                    </RoomItem>
                ))}
            </RoomsList>
        </Section>
    );
}

export default RecentRooms;
