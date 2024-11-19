import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BookItem from "./component/BookItem";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Title,
    BackButton,
    TitleContainer,
} from "./style/HeaderStyle";

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

const DesiredBooksPage = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    `/mongdangbul/library/books/${userId}`
                );
                setBooks(response.data.interestBooks);
            } catch (error) {
                console.error(
                    "관심 도서 목록을 불러오는데 실패했습니다:",
                    error
                );
            }
        };

        fetchBooks();
    }, []);

    return (
        <Container>
            <TitleContainer>
                <BackButton onClick={() => navigate("/mypage")}>
                    <FaArrowLeft />
                </BackButton>
                <Title>관심 도서 목록</Title>
            </TitleContainer>
            <BookList>
                {books.length > 0 ? (
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

export default DesiredBooksPage;
