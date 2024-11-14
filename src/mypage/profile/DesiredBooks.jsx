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
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    {book.bookId} 
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {book.bookTitle}
                                </Typography>
                                <Typography variant="body1">ISBN : {book.isbn}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </>
    );
}

export default DesiredBooks;
