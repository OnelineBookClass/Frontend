import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Title } from "../style/TitleStyle";

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

function Recommendations({ recommended }) {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/recommended");
    };

    return (
        <Section>
            <Title onClick={handleTitleClick}>
                추천 책 <IoIosArrowForward />
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
