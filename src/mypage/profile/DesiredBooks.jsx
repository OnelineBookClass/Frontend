import { Card, CardMedia, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DesiredBooks({ interestBooks }) {
    const navigate = useNavigate();
    return (
        <>
            <Grid container spacing={2}>
                {interestBooks.map((book) => (
                    <Grid item xs={3} key={book.isbn}>
                        <Card>
                            <CardMedia
                                component='img'
                                image={book.thumbnail}
                                alt={book.bookTitle}
                                sx={{ height: 180 }}
                                onClick={() => navigate(`/book/${book.isbn}`)}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default DesiredBooks;
