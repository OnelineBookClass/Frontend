import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../utils/axiosConfig";
import styled from "styled-components";
import {
    Container,
    Header,
    Title,
    SliderContainer,
    ToggleContainer,
    ToggleButton,
    GroupTag,
    GroupMember,
    CustomSlider,
} from "./style/MyGroup.style";
import GroupCard from "./components/GroupCard";
import CreateGroupButton from "./components/CreateGroupButton";
import LoadingOverlay from "../components/LoadingOverlay";
import NoParticipatingGroup from "./components/NoParticipatingGroup";
import { PiBooks } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";

const IntroContainer = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
`;

const MyGroupPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [groupType, setGroupType] = useState("myGroup");
    const [groupData, setGroupData] = useState({
        myGroup: [],
        participatedGroup: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const { isDark } = useTheme();

    useEffect(() => {
        const fetchGroups = async () => {
            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/mongdangbul/myGroups/${userId}`
                );
                setGroupData(response.data);
                setError(null);
            } catch (error) {
                console.error("그룹 데이터 로딩 실패:", error);
                setError("모임 정보를 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchGroups();
        }
    }, [userId]);

    // 그룹 타입이 변경될 때 현재 슬라이드를 리셋
    useEffect(() => {
        setCurrentSlide(0);
    }, [groupType]);

    const currentGroups = groupData[groupType] || [];

    const handleCreateGroup = () => {
        navigate("/create-group");
    };

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "120px",
        arrows: false,
        draggable: true,
        swipe: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    centerPadding: "100px",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: "60px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    centerPadding: "40px",
                },
            },
        ],
    };

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return (
            <Container>
                <Header>
                    <Title>{error}</Title>
                </Header>
            </Container>
        );
    }

    return (
        <Container>
            <IntroContainer>
                <PiBooks fontSize={50} />
                <Title>
                    사람들과 함께
                    <br /> 책장을 넘겨보세요.
                </Title>
            </IntroContainer>
            <Header>
                <ToggleContainer>
                    <ToggleButton
                        active={groupType === "myGroup"}
                        onClick={() => setGroupType("myGroup")}
                    >
                        내가 만든 모임
                        {groupData.myGroup.length > 0 &&
                            ` (${groupData.myGroup.length})`}
                    </ToggleButton>
                    <ToggleButton
                        active={groupType === "participatedGroup"}
                        onClick={() => setGroupType("participatedGroup")}
                    >
                        참여 중인 모임
                        {groupData.participatedGroup.length > 0 &&
                            ` (${groupData.participatedGroup.length})`}
                    </ToggleButton>
                </ToggleContainer>
            </Header>

            <SliderContainer>
                <CustomSlider {...sliderSettings} isDark={isDark}>
                    {currentGroups.length > 0 ? (
                        currentGroups.map((group) => (
                            <div key={group.roomId} className='slide-item'>
                                <GroupCard
                                    group={group}
                                    isHost={groupType === "myGroup"}
                                >
                                    <GroupTag>{group.tag}</GroupTag>
                                    <GroupMember>
                                        {group.current}/{group.maximum}명
                                    </GroupMember>
                                </GroupCard>
                            </div>
                        ))
                    ) : (
                        <div className='slide-item'>
                            {groupType === "myGroup" ? (
                                <CreateGroupButton
                                    onClick={handleCreateGroup}
                                />
                            ) : (
                                <NoParticipatingGroup />
                            )}
                        </div>
                    )}
                    {groupType === "myGroup" && currentGroups.length > 0 && (
                        <div className='slide-item'>
                            <CreateGroupButton onClick={handleCreateGroup} />
                        </div>
                    )}
                </CustomSlider>
            </SliderContainer>
        </Container>
    );
};

export default MyGroupPage;
