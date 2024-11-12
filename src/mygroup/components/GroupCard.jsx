import styled from "styled-components";

const CardContainer = styled.div`
    width: 280px;
    height: 280px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
`;

const BookImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const BookTitle = styled.h2`
    margin: 10px 0;
    font-size: 16px;
`;

const LastRead = styled.p`
    color: #666;
    font-size: 14px;
`;

const GroupCard = ({ image, title, lastRead }) => {
    return (
        <CardContainer>
            <BookImage src={image} />
            <BookTitle>{title}</BookTitle>
            <LastRead>{lastRead}</LastRead>
        </CardContainer>
    );
};

export default GroupCard;
