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
    console.log("컴포넌트 시작");
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    console.log("userId:", userId);

    useEffect(() => {
        console.log("useEffect 실행");
        const fetchBooks = async () => {
            try {
                console.log("API 호출 시작");
                const response = await axiosInstance.get(
                    `/mongdangbul/library/books/${userId}`
                );
                console.log("API 응답:", response.data);
                setBooks(response.data.interestBooks);
                setError(null);
            } catch (error) {
                console.error("API 에러:", error);
                setError(error.message);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchBooks();
        } else {
            setLoading(false);
            setError("로그인이 필요합니다.");
        }
    }, [userId]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!books) return <div>데이터를 불러올 수 없습니다.</div>;

    return (
        <Container>
            <TitleContainer>
                <Title>관심 도서 목록</Title>
            </TitleContainer>
            <BookList>
                {books.length > 0 ? (
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
