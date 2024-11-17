import {  Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";



function DesiredBooks({interestBooks}) {

    return (
        <>
            <Grid container spacing={2}>
                {interestBooks.map((book) => (
                    <Grid item xs={3} key={book.bookId}>
                        <Card>
                            <CardMedia component="img" image={book.thumbnail} alt={book.bookTitle} sx={{ height: 120 }} />

                            <CardContent>
                                <Typography variant="body1" sx={{ fontSize: '0.75rem' }}>ISBN : {book.isbn}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </>
    );
}

export default DesiredBooks;
