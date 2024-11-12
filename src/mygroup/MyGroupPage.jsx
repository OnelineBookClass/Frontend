import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../asset/image/Logo.png";
import GroupCard from "./components/GroupCard";
import CreateGroupButton from "./components/CreateGroupButton";
import Indicators from "./components/Indicators";

import {
    Container,
    Header,
    BookIcon,
    Title,
    SliderContainer,
    NavButton,
} from "./style/MyGroup.style";

const MyGroupPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const groups = [
        {
            id: 1,
            image: Logo,
            title: "돈의 속성",
            lastRead: "돈",
        },
        {
            id: 2,
            image: Logo,
            title: "용기받을 미움",
            lastRead: "미워",
        },
    ];

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev < groups.length ? prev + 1 : prev));
    };

    const handleCreateGroup = () => {
        navigate("/create-group");
    };

    return (
        <Container>
            <Header>
                <BookIcon>📚</BookIcon>
                <Title>사람들과 함께 책장을 넘겨보세요.</Title>
            </Header>

            <SliderContainer>
                {currentSlide > 0 && (
                    <NavButton onClick={handlePrevSlide}>&lt;</NavButton>
                )}

                {currentSlide < groups.length ? (
                    <GroupCard
                        image={groups[currentSlide].image}
                        title={groups[currentSlide].title}
                        lastRead={groups[currentSlide].lastRead}
                    />
                ) : (
                    <CreateGroupButton onClick={handleCreateGroup} />
                )}

                {currentSlide < groups.length && (
                    <NavButton onClick={handleNextSlide}>&gt;</NavButton>
                )}
            </SliderContainer>

            <Indicators total={groups.length + 1} current={currentSlide} />
        </Container>
    );
};

export default MyGroupPage;
