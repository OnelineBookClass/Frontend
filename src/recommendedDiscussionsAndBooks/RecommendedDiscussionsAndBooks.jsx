// RecommendedDiscussionsAndBooks.js
import React from 'react';
import { Box, Typography } from '@mui/material';

// 컴포넌트 임포트
import GenreSection from "./components/GenreSection"
import DiscussionList from './components/DiscussionList';
import GoBackButton from './components/GoBackButton';

// 스타일 임포트
import { Title, StyledHr } from './style/RecommendedDiscussionsAndBooksStyle';

function RecommendedDiscussionsAndBooks() {
    return (
        <Box sx={{ p: 2 }}>
            <GoBackButton />
            <Title>추천 토론방</Title>
            <StyledHr />
            <GenreSection />
            <Typography variant="h6" sx={{ mt: 3 }}>
                토론방 리스트
            </Typography>
            <DiscussionList />
        </Box>
    );
}

export default RecommendedDiscussionsAndBooks;
