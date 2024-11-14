import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardMedia, Grid, Typography, CardContent } from "@mui/material";
import axiosInstance from "../../utils/axiosConfig"; // axiosInstance를 임포트

function FavoriteGroups({groups}) {

    // 일단 보류  (마이페이지에서 제외)

   /* const location = useLocation();
    const userId = location.state?.userId; // userId를 useLocation을 통해 받기

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchGroupEntries = async () => {
            try {

                // 1. api 요청
                if (userId) {
                    const response = await axiosInstance.get(`/mongdangbul/myGroups/${userId}`);
                    setEntries(response.data.groups.slice(0, 4));
                }

                // 2. Mock 데이터
                const mockData = [
                    { roomId: 1, roomTitle: "방 이름 1", createdAt : "2024-11-01", image: "https://via.placeholder.com/150", hostNickname: "문학의 세계" },
                    { roomId: 2, roomTitle: "방 이름 2", createdAt : "2024-11-01", image: "https://via.placeholder.com/150", hostNickname: "영어회화 마스터" },
                    { roomId: 3, roomTitle: "방 이름 3", createdAt : "2024-11-01", image: "https://via.placeholder.com/150", hostNickname: "삶의 의미" },
                    { roomId: 4, roomTitle: "방 이름 4", createdAt : "2024-11-01", image: "https://via.placeholder.com/150", hostNickname: "고전 탐구" },
                    { roomId: 5, roomTitle: "방 이름 5", createdAt : "2024-11-01", image: "https://via.placeholder.com/150", hostNickname: "여행과 이야기" },
                ];
                setEntries(mockData.slice(0, 4));

            }
            catch (error) {
                console.error("Failed to fetch group entries : ", error);
            }
        };
        fetchGroupEntries();
    }, []);*/



    return (
        <>
            <Grid container spacing={2}>
                {groups.map((group) => (
                    <Grid item xs={3} key={group.roomId}>
                        <Card>
                            <CardMedia component="img" image={group.image} alt={group.title} sx={{ height: 120 }} />
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    {group.roomTitle}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {group.createdAt}
                                </Typography>
                                <Typography variant="body1">{group.hostNickname}</Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </>
    );
}

export default FavoriteGroups;
