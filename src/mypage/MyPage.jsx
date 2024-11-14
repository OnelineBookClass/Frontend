import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // 추가된 부분
import UserInfo from "./profile/UserInfo";
import DesiredBooks from "./profile/DesiredBooks";
import DiscussionEntries from "./profile/DiscussionEntries";
import axiosInstance from "../utils/axiosConfig";
import { useLocation } from "react-router-dom";


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

    const mockData = {
        "myInfo" : {
            "userImage" : "https://via.placeholder.com/150",
            "rating" : 4.5,
            "nickName" : "nick"
        },
        "interestBooks": [
            {
                "thumbnail": "https://via.placeholder.com/150",
                "isbn": "0x011112",
            },
            {
                "thumbnail": "https://via.placeholder.com/150",
                "isbn": "0x011113",
            },
            {
                "thumbnail": "https://via.placeholder.com/150",
                "isbn": "0x011114",
            },
            {
                "thumbnail": "https://via.placeholder.com/150",
                "isbn": "0x011115",
            },
            {
                "thumbnail": "https://via.placeholder.com/150",
                "isbn": "0x011116",
            },
        ],
        "discussions": [
            {
                "discussionId": 1,
                "roomTitle" : "string",
                "bookTitle": "string",
                "discussionDate": "date",
                "thumbnail": "https://via.placeholder.com/150"
            },
            {
                "discussionId": 2,
                "roomTitle" : "string",
                "bookTitle": "string",
                "discussionDate": "date",
                "thumbnail": "https://via.placeholder.com/150"
            },
            {
                "discussionId": 3,
                "roomTitle" : "string",
                "bookTitle": "string",
                "discussionDate": "date",
                "thumbnail": "https://via.placeholder.com/150"
            },
            {
                "discussionId": 4,
                "roomTitle" : "string",
                "bookTitle": "string",
                "discussionDate": "date",
                "thumbnail": "https://via.placeholder.com/150"
            },
            {
                "discussionId": 5,
                "roomTitle" : "string",
                "bookTitle": "string",
                "discussionDate": "date",
                "thumbnail": "https://via.placeholder.com/150"
            },
            
        ]
    }

    const location = useLocation();
    const userId = location.state?.userId;

    const [mypageData, setMypageData] = useState(mockData);

    useEffect(() => {
        const fetchMypageData = async () => {
            try {
                if (userId) {
                    const response = await axiosInstance.get(`/mongdangbul/library/${userId}`);
                    setMypageData(response.data);
                }

            }
            catch (error) {
                console.error("마이 데이터 로딩 실패 : " + error);
            }
        };
        fetchMypageData();
    }, []);

    return (
        <Container>
            <Header>
                <Title>마이페이지</Title>
                <IconButton onClick={() => window.location.href = "/settings"}>
                    <SettingsIcon />
                </IconButton>
            </Header>

            <UserInfo myInfo={mypageData.myInfo}/>

            <Divider sx={{ my: 2 }} />

            <SectionHeader>
                <span>관심 도서 목록</span>
                <IconButton onClick={() => window.location.href = "#"}>
                    <ArrowForwardIcon />
                </IconButton>
            </SectionHeader>
            <DesiredBooks interestBooks={mypageData.interestBooks.slice(0, 4)} />

            <SectionHeader>
                <span>나의 토론 기록</span>
                <IconButton onClick={() => window.location.href = "#"}>
                    <ArrowForwardIcon />
                </IconButton>
            </SectionHeader>
            <DiscussionEntries discussions={mypageData.discussions.slice(0, 4)} />
        </Container>
    );
}

export default MyPage;
