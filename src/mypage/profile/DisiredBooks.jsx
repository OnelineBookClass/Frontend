import React, { useState } from "react";
import { Card, CardMedia, Grid, Button } from "@mui/material";

function DesiredBooks() {
    const books = [
        { id: 1, image: "https://via.placeholder.com/150", title: "문학책" },
        { id: 2, image: "https://via.placeholder.com/150", title: "어학책" },
        { id: 3, image: "https://via.placeholder.com/150", title: "철학책" },
        { id: 4, image: "https://via.placeholder.com/150", title: "과학책" },
        { id: 5, image: "https://via.placeholder.com/150", title: "예술책" },
    ];

    const [showAll, setShowAll] = useState(false);
    const visibleBooks = showAll ? books : books.slice(0, 4);

    return (
        <>
            <Grid container spacing={2}>
                {visibleBooks.map((book) => (
                    <Grid item xs={3} key={book.id}>
                        <Card>
                            <CardMedia component="img" image={book.image} alt={book.title} sx={{ height: 120 }} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
        </>
    );
}

export default DesiredBooks;
