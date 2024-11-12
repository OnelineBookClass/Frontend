import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Button } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 10rem;
`;

function DiaryEntries() {
    const entries = [
        { id: 1, content: "일기 내용 1", date: "2024.10.31", image: "https://via.placeholder.com/150" },
        { id: 2, content: "일기 내용 2", date: "2024.11.01", image: "https://via.placeholder.com/150" },
        { id: 3, content: "일기 내용 3", date: "2024.11.02", image: "https://via.placeholder.com/150" },
        { id: 4, content: "일기 내용 4", date: "2024.11.03", image: "https://via.placeholder.com/150" },
        { id: 5, content: "일기 내용 5", date: "2024.11.04", image: "https://via.placeholder.com/150" },
    ];

    const [showAll, setShowAll] = useState(false);
    const visibleEntries = showAll ? entries : entries.slice(0, 4);

    return (
        <Wrapper>
            <Grid container spacing={2}>
                {visibleEntries.map((entry) => (
                    <Grid item xs={3} key={entry.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={entry.image}
                                alt={"사진이 존재 하지 않습니다."}
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
