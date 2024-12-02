import { useState, useEffect } from "react";
import styled from "styled-components";
import BookItem from "./component/BookItem";
import { useNavigate } from "react-router-dom";
import { Container, TitleContainer } from "./style/HeaderStyle";
import Title from "../../asset/component/Title";
import axiosInstance from "../../utils/axiosConfig";

const BookList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const NoBooks = styled.div`
    text-align: center;
    padding: 40px;
    font-size: 16px;
    color: #666;
`;

const InterestBooks = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        let isSubscribed = true;

        if (!userId) {
            navigate("/");
            return;
        }

        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get(
                    `/mongdangbul/library/books/${userId}`
                );
                if (isSubscribed) {
                    setBooks(response.data.interestBooks || []);
                    console.log(
                        "response.data.interestBooks : ",
                        response.data.interestBooks
                    );
                    setError(null);
                }
            } catch (error) {
                if (isSubscribed) {
                    console.error("API 에러:", error);
                    setError(error.message);
                    setBooks([]);
                }
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        };

        fetchBooks();

        return () => {
            isSubscribed = false;
        };
    }, [navigate]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>에러 발생: {error}</div>;
    }

    return (
        <Container>
            <TitleContainer>
                <Title>관심 도서 목록</Title>
            </TitleContainer>
            <BookList>
                {books?.length > 0 ? (
                    books.map((book) => (
                        <BookItem key={book.interestBookId} book={book} />
                    ))
                ) : (
                    <NoBooks>관심 도서가 존재하지 않습니다!</NoBooks>
                )}
            </BookList>
        </Container>
    );
};

export default InterestBooks;
