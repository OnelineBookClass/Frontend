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
    gap: 10px;
`;

const RoomItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
`;

const RoomThumbnail = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 4px;
    margin-right: 10px;
`;

function RecentRooms({ rooms }) {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/recent");
    };

    return (
        <Section>
            <Title onClick={handleTitleClick}>
                최신 토론방 <IoIosArrowForward />
            </Title>
            <RoomsList>
                {rooms.map((room) => (
                    <RoomItem key={room.roomId}>
                        <RoomThumbnail
                            src={room.thumbnail}
                            alt={room.roomTitle}
                        />
                        <div>
                            <div>{room.roomTitle}</div>
                            <div>{room.author}</div>
                        </div>
                    </RoomItem>
                ))}
            </RoomsList>
        </Section>
    );
}

export default RecentRooms;
