import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
    margin: 20px 0;
`;

const Title = styled.h2`
    font-family: "Pretendard", sans-serif;
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
`;

const BooksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const BookCard = styled.div`
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
`;

const BookImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
`;

const BookInfo = styled.div`
    margin-top: 8px;
`;

function PopularBooks({ books }) {
    const navigate = useNavigate();

    const handleBookClick = (book) => {
        navigate(`/book/${book.ISBN}`, { state: { book } });
    };

    return (
        <Section>
            <Title>모임이 많은 책</Title>
            <BooksGrid>
                {books &&
                    books.map((book) => (
                        <BookCard
                            key={book.ISBN}
                            onClick={() => handleBookClick(book)}
                        >
                            <BookImage src={book.thumbnail} alt={book.title} />
                            <BookInfo>
                                <div>{book.title}</div>
                                <div>{book.author}</div>
                            </BookInfo>
                        </BookCard>
                    ))}
            </BooksGrid>
        </Section>
    );
}

export default PopularBooks;
