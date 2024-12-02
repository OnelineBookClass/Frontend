import React, { useState, useEffect } from "react";
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
    console.log("DesiredBooksPage 컴포넌트 렌더링 시작");
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        console.log("useEffect 실행");
        const fetchBooks = async () => {
            try {
                console.log("데이터 fetch 시도");
                const response = await axiosInstance.get(
                    `/mongdangbul/library/books/${userId}`
                );
                console.log("받은 데이터:", response.data);
                setBooks(response.data.interestBooks || []);
            } catch (error) {
                console.error(
                    "관심 도서 목록을 불러오는데 실패했습니다:",
                    error
                );
                setBooks([]);
            }
        };

        if (userId) {
            fetchBooks();
        } else {
            console.log("userId가 없습니다");
        }
    }, [userId]);

    if (!userId) {
        console.log("userId가 없어서 리다이렉트");
        navigate("/");
        return null;
    }

    return (
        <Container>
            <TitleContainer>
                <Title>관심 도서 목록</Title>
            </TitleContainer>
            <BookList>
                {Array.isArray(books) && books.length > 0 ? (
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
