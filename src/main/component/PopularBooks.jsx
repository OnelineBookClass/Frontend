import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./PopularBooks/sliderSettings";
import { useTheme } from "../../context/ThemeContext";

const Section = styled.section`
    margin: 20px 0;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: ${({ isDark }) => (isDark ? "normal" : "bold")};
`;

const StyledSlider = styled(Slider)`
    .slick-track {
        margin-left: 0;
    }

    .slick-slide > div {
        margin: 0 10px;
    }
`;

const BookCard = styled.div`
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.03);
    }
`;

const BookImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: ${({ isDark }) =>
        isDark
            ? "0 4px 8px rgba(255, 255, 255, 0.5)"
            : "0 4px 8px rgba(0, 0, 0, 0.5)"};
`;

const BookInfo = styled.div`
    margin-top: 10px;
`;

const BookTitle = styled.div`
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${({ isDark }) => (isDark ? "normal" : "bold")};
`;

const BookAuthor = styled.div`
    color: #b3b3b3;
    font-size: 0.9rem;
`;

function PopularBooks({ books }) {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleBookClick = (book) => {
        navigate(`/book/${book.ISBN}`);
    };

    if (!books || books.length === 0) {
        return null;
    }

    return (
        <Section>
            <Title isDark={isDark}>모임이 많은 책</Title>
            <StyledSlider {...settings}>
                {books.map((book) => (
                    <BookCard
                        key={book.ISBN}
                        onClick={() => handleBookClick(book)}
                    >
                        <BookImage
                            isDark={isDark}
                            src={book.thumbnail}
                            alt={book.bookTitle}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "기본이미지URL";
                            }}
                        />
                        <BookInfo>
                            <BookTitle isDark={isDark}>
                                {book.bookTitle}
                            </BookTitle>
                            <BookAuthor>{book.author}</BookAuthor>
                        </BookInfo>
                    </BookCard>
                ))}
            </StyledSlider>
        </Section>
    );
}

export default PopularBooks;
