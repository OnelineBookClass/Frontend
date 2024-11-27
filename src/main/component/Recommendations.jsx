import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";

const Section = styled.section`
    margin: 20px 0;
`;

const RecommendedGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
`;

const ItemCard = styled.div`
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 8px;
`;

const ItemImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-weight: bold;
`;

function Recommendations({ recommended }) {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/recommended");
    };

    return (
        <Section>
            <Title onClick={handleTitleClick} isDark={isDark}>
                추천 책
            </Title>
            <RecommendedGrid>
                {recommended &&
                    recommended.map((book) => (
                        <ItemCard key={book.ISBN}>
                            <ItemImage src={book.thumbnail} alt={book.title} />
                            <div>
                                <div>{book.title}</div>
                                <div>{book.author}</div>
                            </div>
                        </ItemCard>
                    ))}
            </RecommendedGrid>
        </Section>
    );
}

export default Recommendations;
