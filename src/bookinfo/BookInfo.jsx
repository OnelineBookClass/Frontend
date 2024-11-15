import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookDiscussions from "./components/BookDiscussions";
import BookReviews from "./components/BookReviews";
import BookHeader from "./components/BookHeader";
import { Container } from "./style/BookInfoStyles";
import axiosInstance from "../utils/axiosConfig";

function BookInfo() {
    const [meetings, setMeetings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const location = useLocation();
    const book = location.state?.book;

    const fetchBookData = async () => {
        try {
            const response = await axiosInstance.get(
                `/mongdangbul/books/${book.ISBN}`
            );
            setMeetings(response.data.rooms);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error("Failed to fetch book data:", error);
        }
    };

    useEffect(() => {
        fetchBookData();
    }, []);

    return (
        <Container>
            <BookHeader book={book} />
            <BookDiscussions discussions={meetings} imageURL={book.thumbnail} />
            <BookReviews
                reviews={reviews}
                isbn={book.ISBN}
                onReviewSubmit={fetchBookData}
            />
        </Container>
    );
}

export default BookInfo;
