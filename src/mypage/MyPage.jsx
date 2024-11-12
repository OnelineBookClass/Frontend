import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // 추가된 부분
import UserInfo from "./profile/UserInfo";
import FavoriteGroups from "./profile/FavoriteGroups";
import DesiredBooks from "./profile/DesiredBooks";
import DiscussionEntries from "./profile/DiscussionEntries";

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

function MyPage() {
    return (
        <Container>
            <Header>
                <Title>마이페이지</Title>
                <IconButton onClick={() => window.location.href = "/settings"}>
                    <SettingsIcon />
                </IconButton>
            </Header>

            <UserInfo />

            <Divider sx={{ my: 2 }} />

            <SectionHeader>
                <span>나의 모임</span>
                <IconButton onClick={() => window.location.href = "#"}>
                    <ArrowForwardIcon />
                </IconButton>
            </SectionHeader>
            <FavoriteGroups />

            <SectionHeader>
                <span>담아 둔 책</span>
                <IconButton onClick={() => window.location.href = "#"}>
                    <ArrowForwardIcon />
                </IconButton>
            </SectionHeader>
            <DesiredBooks />

            <SectionHeader>
                <span>나의 토론 기록</span>
                <IconButton onClick={() => window.location.href = "#"}>
                    <ArrowForwardIcon />
                </IconButton>
            </SectionHeader>
            <DiscussionEntries />
        </Container>
    );
}

export default MyPage;
