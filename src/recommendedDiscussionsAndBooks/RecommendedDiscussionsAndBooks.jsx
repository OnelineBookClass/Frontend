// RecommendedDiscussionsAndBooks.js
import React, {useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';

// 컴포넌트 임포트
import GenreSection from "./components/GenreSection"
import DiscussionList from './components/DiscussionList';
import GoBackButton from './components/GoBackButton';

// 스타일 임포트
import { Title, StyledHr } from './style/RecommendedDiscussionsAndBooksStyle';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

function RecommendedDiscussionsAndBooks() {

    const mockData = {
        "rooms": [
            {
                "roomId": 1,
                "roomTitle": "string",
                "createdAt": "date",
                "hostNickname": "string",
                "tag": "잔잔한"
            },
            {
                "roomId": 2,
                "roomTitle": "string",
                "createdAt": "date",
                "hostNickname": "string",
                "tag": "잔잔한"
            },
            {
                "roomId": 3,
                "roomTitle": "string",
                "createdAt": "date",
                "hostNickname": "string",
                "tag": "잔잔한"
            },
            {
                "roomId": 4,
                "roomTitle": "string",
                "createdAt": "date",
                "hostNickname": "string",
                "tag": "잔잔한"
            },
            {
                "roomId": 5,
                "roomTitle": "string",
                "createdAt": "date",
                "hostNickname": "string",
                "tag": "잔잔한"
            },
        ]
    }

    const location = useLocation();
    const userId = location.state?.userId;

    const [discussionListData, setDiscussionListData] = useState(mockData);

    useEffect(() => {
        const fetchDiscussionListData = async () => {
            try {
                if (userId) { // 일단 mock 객체를 위해 일단 조건 부여
                    // 일단 토론 페이지의 토론 리스트 api 가 없어서 최신 토론방 리스트로 대체
                    const response = await axiosInstance.get(`/mongdangbul/books/recent`);
                    setDiscussionListData(response.data);
                }
            }
            catch (error) {
                console.error("토론 목록 조회 실패");
            }
        };
        fetchDiscussionListData();
    }, [])

    return (
        <Box sx={{ p: 2 }}>
            <GoBackButton />
            <Title>추천 토론방</Title>
            <StyledHr />
            <GenreSection />
            <Typography variant="h6" sx={{ mt: 3 }}>
                토론방 리스트
            </Typography>
            <DiscussionList rooms = {discussionListData.rooms}/>
        </Box>
    );
}

export default RecommendedDiscussionsAndBooks;
