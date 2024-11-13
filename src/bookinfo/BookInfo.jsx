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

    // API 호출 부분 (주석처리)

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await Promise.all([
                    axiosInstance.get(`/mongdangbul/books/${book.ISBN}`),
                ]);
                setMeetings(response[0].data.rooms);
                setReviews(response[0].data.reviews);
            } catch (error) {
                console.error("Failed to fetch book data:", error);
            }
        };
        fetchBookData();
    }, [book.ISBN]);

    return (
        <Container>
            <BookHeader book={book} />

            <BookDiscussions discussions={meetings} imageURL={book.thumbnail} />
            <BookReviews reviews={reviews} />
        </Container>
    );
}

export default BookInfo;
