import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig"; // axiosInstance를 임포트

const Wrapper = styled.div`
    margin-bottom: 10rem;
`;

function DiscussionEntries() {
    const location = useLocation();
    const userId = location.state?.userId; // userId를 useLocation을 통해 받기

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchDiscussionEntries = async () => {
            try {
                // 1. api 요청
                if (userId) {
                    // axiosInstance를 사용하여 API 요청
                    const response = await axiosInstance.get(
                        `/mongdangbul/library/discussions/${userId}`
                    );
                    setEntries(response.data.discussions.slice(0, 4));
                }

                // 2. Mock 데이터
                // Mock 데이터 예시 (주석 처리 시, 실제 API 데이터를 사용할 수 있습니다)
                const mockData = [
                    {
                        discussionId: 1,
                        bookTitle: "책 제목1",
                        summary: "토론 기록 1",
                        discussionDate: "2024.10.31",
                        image: "https://via.placeholder.com/150",
                    },
                    {
                        discussionId: 2,
                        bookTitle: "책 제목2",
                        summary: "토론 기록 2",
                        discussionDate: "2024.11.01",
                        image: "https://via.placeholder.com/150",
                    },
                    {
                        discussionId: 3,
                        bookTitle: "책 제목3",
                        summary: "토론 기록 3",
                        discussionDate: "2024.11.02",
                        image: "https://via.placeholder.com/150",
                    },
                    {
                        discussionId: 4,
                        bookTitle: "책 제목4",
                        summary: "토론 기록 4",
                        discussionDate: "2024.11.03",
                        image: "https://via.placeholder.com/150",
                    },
                    {
                        discussionId: 5,
                        bookTitle: "책 제목5",
                        summary: "토론 기록 5",
                        discussionDate: "2024.11.04",
                        image: "https://via.placeholder.com/150",
                    },
                ];
                setEntries(mockData.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch discussion entries:", error);
            }
        };

        fetchDiscussionEntries();
    }, []);

    return (
        <Wrapper>
            <Grid container spacing={2}>
                {entries.map((entry) => (
                    <Grid item xs={3} key={entry.discussionId}>
                        <Card>
                            <CardMedia
                                component='img'
                                image={entry.image}
                                alt={"사진이 존재하지 않습니다."}
                                sx={{ height: 120 }}
                            />

                            <CardContent>
                                <Typography
                                    variant='h6'
                                    color='textPrimary'
                                    gutterBottom
                                >
                                    {entry.bookTitle} {/* 책 제목 */}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    {entry.discussionDate}
                                </Typography>
                                <Typography variant='body1'>
                                    {entry.summary}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default DiscussionEntries;
