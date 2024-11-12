import React, { useState } from "react";
import { Card, CardMedia, Grid, Button } from "@mui/material";

function FavoriteGroups() {
    const groups = [
        { id: 1, image: "https://via.placeholder.com/150", title: "문학의 세계" },
        { id: 2, image: "https://via.placeholder.com/150", title: "영어회화 마스터" },
        { id: 3, image: "https://via.placeholder.com/150", title: "삶의 의미" },
        { id: 4, image: "https://via.placeholder.com/150", title: "고전 탐구" },
        { id: 5, image: "https://via.placeholder.com/150", title: "여행과 이야기" },
    ];

    const [showAll, setShowAll] = useState(false);
    const visibleGroups = showAll ? groups : groups.slice(0, 4);

    return (
        <>
            <Grid container spacing={2}>
                {visibleGroups.map((group) => (
                    <Grid item xs={3} key={group.id}>
                        <Card>
                            <CardMedia component="img" image={group.image} alt={group.title} sx={{ height: 120 }} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        
        </>
    );
}

export default FavoriteGroups;
