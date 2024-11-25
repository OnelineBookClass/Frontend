import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Title } from "../style/TitleStyle";
import { IoIosArrowForward } from "react-icons/io";
import RoomItems from "../../asset/component/RoomItems";

const Section = styled.section`
    margin: 20px 0;
`;

function RecentRooms({ rooms }) {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/recent");
    };

    return (
        <Section>
            <Title onClick={handleTitleClick}>
                최신 모임 <IoIosArrowForward />
            </Title>
            <RoomItems rooms={rooms} />
        </Section>
    );
}

export default RecentRooms;
