import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Header,
    BookIcon,
    Title,
    SliderContainer,
    NavButton,
    ToggleContainer,
    ToggleButton,
    GroupInfo,
    GroupTag,
    GroupMember,
} from "./style/MyGroup.style";
import GroupCard from "./components/GroupCard";
import CreateGroupButton from "./components/CreateGroupButton";
import Indicators from "./components/Indicators";
import Logo from "../asset/image/Logo.png";

const MyGroupPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [groupType, setGroupType] = useState("myGroup"); // 'myGroup' or 'participatedGroup'
    const navigate = useNavigate();

    const groups = {
        myGroup: [
            {
                roomId: 1,
                roomTitle: "첫번째 모임",
                author: "작가1",
                bookTitle: "책제목1",
                rating: 4.5,
                thumbnail: Logo,
                tag: "소설",
                maximum: 10,
                current: 5,
                createdAt: "2024-03-20",
                intro: "모임 소개1",
            },
            // ... 더 많은 myGroup 데이터
        ],
        participatedGroup: [
            {
                roomId: 2,
                roomTitle: "두번째 모임",
                author: "작가2",
                bookTitle: "책제목2",
                rating: 4.0,
                hostNickname: "호스트1",
                thumbnail: Logo,
                tag: "에세이",
                maximum: 8,
                current: 6,
                createdAt: "2024-03-21",
                intro: "모임 소개2",
            },
            // ... 더 많은 participatedGroup 데이터
        ],
    };

    const currentGroups = groups[groupType];

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) =>
            prev < currentGroups.length ? prev + 1 : prev
        );
    };

    const handleCreateGroup = () => {
        navigate("/create-group");
    };

    return (
        <Container>
            <Header>
                <BookIcon>📚</BookIcon>
                <Title>사람들과 함께 책장을 넘겨보세요.</Title>
                <ToggleContainer>
                    <ToggleButton
                        active={groupType === "myGroup"}
                        onClick={() => setGroupType("myGroup")}
                    >
                        내가 만든 모임
                    </ToggleButton>
                    <ToggleButton
                        active={groupType === "participatedGroup"}
                        onClick={() => setGroupType("participatedGroup")}
                    >
                        참여 중인 모임
                    </ToggleButton>
                </ToggleContainer>
            </Header>

            <SliderContainer>
                {currentSlide > 0 && (
                    <NavButton onClick={handlePrevSlide}>&lt;</NavButton>
                )}

                {currentSlide < currentGroups.length ? (
                    <GroupCard
                        group={currentGroups[currentSlide]}
                        isHost={groupType === "myGroup"}
                    >
                        <GroupTag>{currentGroups[currentSlide].tag}</GroupTag>
                        <GroupMember>
                            {currentGroups[currentSlide].current}/
                            {currentGroups[currentSlide].maximum}명
                        </GroupMember>
                    </GroupCard>
                ) : (
                    <CreateGroupButton onClick={handleCreateGroup} />
                )}

                {currentSlide < currentGroups.length && (
                    <NavButton onClick={handleNextSlide}>&gt;</NavButton>
                )}
            </SliderContainer>

            <Indicators
                total={currentGroups.length + 1}
                current={currentSlide}
            />
        </Container>
    );
};

export default MyGroupPage;
