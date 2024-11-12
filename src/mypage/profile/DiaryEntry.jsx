import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig"; 

const Wrapper = styled.div`
    margin-bottom: 10rem;
`;

function DiaryEntries() {
    const location = useLocation();
    const userId = location.state?.userId; // userId를 useLocation을 통해 받기

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchDiaryEntries = async () => {
            try {


                // 1. api 요청 
                if (userId) {
                    // axiosInstance를 사용하여 API 요청
                    const response = await axiosInstance.get(`/mongdangbul/diary/${userId}`);
                    setEntries(response.data.entries.slice(0, 4)); 
                }

                // 2. Mock 데이터
                // Mock 데이터 예시 (주석 처리 시, 실제 API 데이터를 사용할 수 있습니다)
                const mockData = [
                    { id: 1, content: "일기 내용 1", date: "2024.10.31", image: "https://via.placeholder.com/150" },
                    { id: 2, content: "일기 내용 2", date: "2024.11.01", image: "https://via.placeholder.com/150" },
                    { id: 3, content: "일기 내용 3", date: "2024.11.02", image: "https://via.placeholder.com/150" },
                    { id: 4, content: "일기 내용 4", date: "2024.11.03", image: "https://via.placeholder.com/150" },
                    { id: 5, content: "일기 내용 5", date: "2024.11.04", image: "https://via.placeholder.com/150" },
                ];
                setEntries(mockData.slice(0, 4)); 



            } catch (error) {
                console.error("Failed to fetch diary entries:", error);
            }
        };

        fetchDiaryEntries(); 
    }, []);

    return (
        <Wrapper>
            <Grid container spacing={2}>
                {entries.map((entry) => (
                    <Grid item xs={3} key={entry.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={entry.image}
                                alt={"사진이 존재하지 않습니다."}
                                sx={{ height: 120 }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary">
                                    {entry.date}
                                </Typography>
                                <Typography variant="body1">{entry.content}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default DiaryEntries;
