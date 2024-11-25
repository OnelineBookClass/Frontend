import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../asset/image/Logo.png";

const Card = styled.div`
    border: 1px solid #ddd;
    color: #666;
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

const CardContainer = styled.div`
    border: 1px solid #ddd;
    color: #666;
    border-radius: 8px;
    padding: 15px;
    background: white;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`;

function BookCard({ book }) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get("from");

    const handleClick = () => {
        if (from === "createGroup") {
            navigate(
                `/create-group?isbn=${book.isbn}&bookTitle=${book.title}&author=${book.authors}`,
                {
                    state: { thumbnail: book.thumbnail },
                }
            );
        } else {
            navigate(`/book/${book.isbn}`);
        }
    };

    return (
        <CardContainer onClick={handleClick}>
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
        </CardContainer>
    );
}

export default BookCard;
