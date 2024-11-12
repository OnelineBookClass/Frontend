import React, { useEffect, useState } from "react";
import {  Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";


function DesiredBooks() {

    const location = useLocation();
    const userId = location.state?.userId; // userId를 useLocation을 통해 받기

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchDesiredBookEntries = async () => {

            try {

                // 1. api 요청
                if (userId) {
                    const response = await axiosInstance.get(`/mongdangbul/library/books/${userId}`);
                    setEntries(response.data.books.slice(0, 4));
                }

                // 2. Mock 데이터
                const mockData = [
                    { bookId: 1, author: "저자 1", thumbnail: "https://via.placeholder.com/150", title: "문학책", rating : "4.0" },
                    { bookId: 2, author: "저자 2", thumbnail: "https://via.placeholder.com/150", title: "어학책", rating : "4.1" },
                    { bookId: 3, author: "저자 3", thumbnail: "https://via.placeholder.com/150", title: "철학책", rating : "4.2" },
                    { bookId: 4, author: "저자 4", thumbnail: "https://via.placeholder.com/150", title: "과학책", rating : "4.3" },
                    { bookId: 5, author: "저자 5", thumbnail: "https://via.placeholder.com/150", title: "예술책", rating : "4.4" },
                ];
                setEntries(mockData.slice(0, 4));

            }
            catch (error) {
                console.error("Failed to fetch desiredBook entries :", error);
            }

        };
        fetchDesiredBookEntries();

    },[]);

    return (
        <>
            <Grid container spacing={2}>
                {entries.map((book) => (
                    <Grid item xs={3} key={book.bookId}>
                        <Card>
                            <CardMedia component="img" image={book.thumbnail} alt={book.title} sx={{ height: 120 }} />

                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    {book.title} 
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {book.author}
                                </Typography>
                                <Typography variant="body1">평점 : {book.rating}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </>
    );
}

export default DesiredBooks;
