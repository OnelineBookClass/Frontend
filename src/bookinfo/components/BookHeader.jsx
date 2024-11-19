import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../login/context/LoginContext";
import axiosInstance from "../../utils/axiosConfig";
import {
    BookHead,
    BookImage,
    BookDetails,
    Title,
    Author,
    Publisher,
    HeartButton,
} from "../style/BookHeaderStyles";

function BookHeader({ book }) {
    const [isLiked, setIsLiked] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        let isMounted = true;

        const checkInterest = async () => {
            try {
                const response = await axiosInstance.post(
                    "/mongdangbul/library/books/checkInterest",
                    {
                        userId,
                        isbn: book.isbn,
                    }
                );
                if (isMounted) {
                    setIsLiked(response.data.isInterested);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("관심 도서 상태 확인 실패:", error);
                }
            }
        };

        if (book && book.isbn) {
            checkInterest();
        }

        return () => {
            isMounted = false;
        };
    }, [userId, book?.isbn]);

    const handleHeartClick = () => {
        if (!book || !book.isbn) return;

        setIsLiked(!isLiked);

        axiosInstance
            .post("/mongdangbul/library/books/interest", {
                userId,
                isbn: book.isbn,
            })
            .catch((error) => {
                console.error("관심 도서 처리 실패:", error);
                setIsLiked(!isLiked);
            });
    };

    if (!book) return null;

    return (
        <BookHead>
            <BookImage
                src={book.thumbnail || "https://via.placeholder.com/150"}
                alt={book.title}
            />
            <BookDetails>
                <Title>{book.title}</Title>
                <Author>저자: {book.author || "저자 정보 없음"}</Author>
                <Publisher>
                    출판사: {book.publisher || "출판사 정보 없음"}
                </Publisher>
            </BookDetails>
            <HeartButton onClick={handleHeartClick} isLiked={isLiked}>
                {isLiked ? "❤️" : "🤍"}
            </HeartButton>
        </BookHead>
    );
}

export default BookHeader;
