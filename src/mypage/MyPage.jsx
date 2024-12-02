import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import { FaArrowRight } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import UserInfo from "./profile/UserInfo";
import DesiredBooks from "./profile/DesiredBooks";
import DiscussionEntries from "./profile/DiscussionEntries";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useTheme } from "../context/ThemeContext";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa6";

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
    position: relative;
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

const CustomSwitch = muiStyled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase": {
        "&.Mui-checked": {
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: "#6b738e",
                opacity: 0.8,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "#fff",
    },
    "& .MuiSwitch-track": {
        backgroundColor: "#6b738e",
        opacity: 0.5,
    },
}));

const ThemeControls = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const SettingsAndLogout = styled.div`
    display: flex;
    align-items: center;
`;

const LogoutButton = styled(IconButton)`
    color: #ff4444 !important;
    margin-left: 8px;
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
                    console.log(response.data);
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

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("userId");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/");
        }
    };

    return (
        <Container>
            <Header>
                <Title>마이페이지</Title>
                <ThemeControls>
                    <MdOutlineWbSunny
                        style={{ fontSize: "clamp(1rem, 5vw, 1.5rem)" }}
                    />
                    <CustomSwitch checked={isDark} onChange={toggleTheme} />
                    <FiMoon style={{ fontSize: "clamp(1rem, 5vw, 1.5rem)" }} />
                </ThemeControls>
                <SettingsAndLogout>
                    <IconButton onClick={settingButtonClick}>
                        <IoSettingsOutline
                            color={isDark ? "#ffffff" : "#0d142d"}
                        />
                    </IconButton>
                    <LogoutButton onClick={handleLogout}>
                        <FaPowerOff />
                    </LogoutButton>
                </SettingsAndLogout>
            </Header>

            <UserInfo myInfo={mypageData && mypageData.myInfo} />

            <SectionHeader>
                <span>관심 도서 목록</span>
                <IconButton onClick={() => navigate(`/desired`)}>
                    <FaArrowRight
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#ffcc66",
                        }}
                    />
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
                <span style={{ marginTop: "1rem" }}>나의 토론 기록</span>
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
