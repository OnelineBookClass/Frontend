import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section = styled.section`
    margin: 20px 0;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-weight: bold;
    cursor: pointer;
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
            : "0 4px 8px rgba(66, 66, 66, 0.5)"};
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
    font-size: 0.9rem;
`;

const BookAuthor = styled.div`
    color: #b3b3b3;
    font-size: 0.8rem;
`;

const NoRecommendations = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin-top: 20px;
`;

const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 1,
            },
        },
    ],
};

function Recommendations({ recommended }) {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    console.log("recommended : ", recommended);

    const handleBookClick = (book) => {
        navigate(`/book/${book.ISBN}`);
    };

    return (
        <Section>
            <Title isDark={isDark}>추천 책</Title>
            {recommended && recommended.length > 0 ? (
                <StyledSlider {...settings}>
                    {recommended.map((book) => (
                        <BookCard
                            key={book.ISBN}
                            onClick={() => handleBookClick(book)}
                        >
                            <BookImage
                                isDark={isDark}
                                src={book.thumbnail}
                                alt={book.bookTitle}
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
            ) : (
                <NoRecommendations>
                    추천 책이 없습니다.
                    <br />
                    활동을 시작해 맞춤 책을 추천 받아보세요!
                </NoRecommendations>
            )}
        </Section>
    );
}

export default Recommendations;
