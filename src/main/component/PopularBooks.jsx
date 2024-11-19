import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./PopularBooks/sliderSettings";

const Section = styled.section`
    margin: 20px 0;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
    .slick-track {
        margin-left: 0;
    }

    .slick-prev,
    .slick-next {
        z-index: 1;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        margin-left: 5px;
        margin-right: 5px;

        &:before {
            color: #8e0202;
            font-size: 30px;
        }
    }

    .slick-prev {
        left: -25px;
    }

    .slick-next {
        right: -25px;
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
`;

const BookInfo = styled.div`
    margin-top: 8px;
`;

const BookTitle = styled.div`
    font-weight: bold;
    margin-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const BookAuthor = styled.div`
    color: #666;
    font-size: 0.9rem;
`;

function PopularBooks({ books }) {
    const navigate = useNavigate();

    const handleBookClick = (book) => {
        navigate(`/book/${book.ISBN}`);
    };

    if (!books || books.length === 0) {
        return null;
    }

    return (
        <Section>
            <Title>모임이 많은 책</Title>
            <StyledSlider {...settings}>
                {books.map((book) => (
                    <BookCard
                        key={book.ISBN}
                        onClick={() => handleBookClick(book)}
                    >
                        <BookImage
                            src={book.thumbnail}
                            alt={book.bookTitle}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "기본이미지URL";
                            }}
                        />
                        <BookInfo>
                            <BookTitle>{book.bookTitle}</BookTitle>
                            <BookAuthor>{book.author}</BookAuthor>
                        </BookInfo>
                    </BookCard>
                ))}
            </StyledSlider>
        </Section>
    );
}

export default PopularBooks;
