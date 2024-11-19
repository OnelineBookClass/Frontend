import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookDiscussions from "./components/BookDiscussions";
import BookReviews from "./components/BookReviews";
import BookHeader from "./components/BookHeader";
import { Container } from "./style/BookInfoStyles";
import axiosInstance from "../utils/axiosConfig";

function BookInfo() {
    const [meetings, setMeetings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [book, setBook] = useState(null);
    const { isbn } = useParams();

    const fetchBookData = async () => {
        try {
            const response = await axiosInstance.get(
                `/mongdangbul/books/${isbn}`
            );

            setMeetings(response.data.rooms || []);
            setReviews(response.data.reviews || []);
            setBook(response.data.bookInfo);
        } catch (error) {
            console.error("Failed to fetch book data:", error);
        }
    };

    useEffect(() => {
        if (isbn) {
            fetchBookData();
        }
    }, [isbn]);

    return (
        <Container>
            <BookHeader book={book} />
            <BookDiscussions
                discussions={meetings}
                imageURL={book?.thumbnail}
            />
            <BookReviews
                isbn={isbn}
                reviews={reviews}
                onReviewSubmit={fetchBookData}
            />
        </Container>
    );
}

export default BookInfo;
