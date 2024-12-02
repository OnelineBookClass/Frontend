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

const DesiredBooksPage = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosInstance.get(
                    `/mongdangbul/library/books/${userId}`
                );
                setBooks(response.data.interestBooks || []);
                console.log(response.data);
            } catch (error) {
                console.error(
                    "관심 도서 목록을 불러오는데 실패했습니다:",
                    error
                );
                setBooks([]);
            }
        };

        fetchBooks();
    }, []);

    return (
        <Container>
            <TitleContainer>
                <Title>관심 도서 목록</Title>
            </TitleContainer>
            <BookList>
                {books && books.length > 0 ? (
                    books.map((book) => (
                        <BookItem
                            key={book.interestBookId}
                            book={book}
                            onClick={() => navigate(`/book/${book.isbn}`)}
                        />
                    ))
                ) : (
                    <NoBooks>관심 도서가 존재하지 않습니다!</NoBooks>
                )}
            </BookList>
        </Container>
    );
};

export default DesiredBooksPage;
