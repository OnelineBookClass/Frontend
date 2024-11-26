import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { FaArrowRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import UserInfo from "./profile/UserInfo";
import DesiredBooks from "./profile/DesiredBooks";
import DiscussionEntries from "./profile/DiscussionEntries";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useTheme } from "../context/ThemeContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1rem 1rem 1rem;
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: clamp(1rem, 5vw, 2rem);
    text-align: left;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0 1rem;
    font-weight: bold;
`;

const NoBooks = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const NoDiscussions = styled.div`
    text-align: center;
    margin-top: 20px;
`;

function MyPage() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [mypageData, setMypageData] = useState();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const fetchMypageData = async () => {
            try {
                if (userId) {
                    const response = await axiosInstance.get(
                        `/mongdangbul/library/${userId}`
                    );
                    setMypageData(response.data);
                }
            } catch (error) {
                console.error("마이 데이터 로딩 실패 : " + error);
            }
        };
        fetchMypageData();
    }, [userId]);

    const settingButtonClick = () => {
        navigate("/settings", { state: mypageData.myInfo });
    };

    return (
        <Container>
            <Header>
                <Title>마이페이지</Title>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Switch
                        checked={isDark}
                        onChange={toggleTheme}
                        color='default'
                    />
                    <IconButton onClick={settingButtonClick}>
                        <IoSettingsOutline
                            color={isDark ? "#ffffff" : "#0d142d"}
                        />
                    </IconButton>
                </div>
            </Header>

            <UserInfo myInfo={mypageData && mypageData.myInfo} />

            <Divider sx={{ my: 2 }} />

            <SectionHeader>
                <span>관심 도서 목록</span>
                <IconButton onClick={() => navigate("/desired")}>
                    <FaArrowRight color='#ffffff' />
                </IconButton>
            </SectionHeader>
            {mypageData &&
            mypageData.interestBooks &&
            mypageData.interestBooks.length > 0 ? (
                <DesiredBooks
                    interestBooks={mypageData.interestBooks.slice(0, 4)}
                />
            ) : (
                <NoBooks>관심 도서가 존재하지 않습니다!</NoBooks>
            )}

            <SectionHeader>
                <span>나의 토론 기록</span>
                <IconButton onClick={() => navigate("/mydiscussion")}>
                    <FaArrowRight color='#ffffff' />
                </IconButton>
            </SectionHeader>
            {mypageData &&
            mypageData.discussions &&
            mypageData.discussions.length > 0 ? (
                <DiscussionEntries
                    discussions={mypageData.discussions.slice(0, 4)}
                />
            ) : (
                <NoDiscussions>토론 기록이 존재하지 않습니다!</NoDiscussions>
            )}
        </Container>
    );
}

export default MyPage;
