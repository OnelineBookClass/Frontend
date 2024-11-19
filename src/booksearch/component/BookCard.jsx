import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../asset/image/Logo.png";

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background: white;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`;

const BookImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const Rating = styled.span`
    color: #ffc107;
    font-weight: bold;
`;

function BookCard({ book }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/book/${book.isbn}`, { state: { book } });
    };

    console.log(book);

    return (
        <Card onClick={handleClick}>
            <BookImage
                src={book.thumbnail || Logo}
                alt={book.title}
                onError={(e) => {
                    e.target.src = Logo; // 이미지 로드 실패시 기본 로고 표시
                }}
            />
            <h3>{book.title}</h3>
            <p>
                저자:{" "}
                {book.authors ? book.authors.join(", ") : "저자 정보 없음"}
            </p>
            <p>출판사: {book.publisher || "출판사 정보 없음"}</p>
            {book.rating && (
                <p>
                    평점: <Rating>{book.rating}</Rating>
                </p>
            )}
        </Card>
    );
}

export default BookCard;
