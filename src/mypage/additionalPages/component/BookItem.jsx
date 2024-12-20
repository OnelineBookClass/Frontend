import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    padding: 16px;
    border: 1px solid #eee;
    border-radius: 8px;
    gap: 20px;
    background-color: white;
    transition: transform 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
`;

const Thumbnail = styled.img`
    width: 120px;
    height: 174px;
    object-fit: cover;
    border-radius: 4px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`;

const Title = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #1a293f;
    margin: 0;
`;

const InfoText = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
`;

const Rating = styled.span`
    font-size: 14px;
    color: #ff9500;
    font-weight: bold;
`;

const BookItem = ({ book }) => {
    const navigate = useNavigate();
    return (
        <Container
            onClick={() => navigate(`/book/${book.isbn}`)}
            style={{ cursor: "pointer" }}
        >
            <Thumbnail src={book.thumbnail} alt={book.bookTitle} />
            <InfoContainer>
                <Title>{book.bookTitle}</Title>
                <InfoText>출판사: {book.publisher}</InfoText>
                <InfoText>저자: {book.author}</InfoText>
                <Rating>평점: {book.rating}</Rating>
            </InfoContainer>
        </Container>
    );
};

export default BookItem;
