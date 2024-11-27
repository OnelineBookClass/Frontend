import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Title } from "../style/TitleStyle";
import { IoIosArrowForward } from "react-icons/io";
import RoomItems from "../../asset/component/RoomItems";
import { useTheme } from "../../context/ThemeContext";

const Section = styled.section`
    margin: 20px 0;
`;

function RecentRooms({ rooms }) {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/recent");
    };

    return (
        <Section>
            <Title onClick={handleTitleClick} isDark={isDark}>
                최신 모임{" "}
                <IoIosArrowForward
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#ffcc66",
                    }}
                />
            </Title>
            <RoomItems rooms={rooms} />
        </Section>
    );
}

export default RecentRooms;
