import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const CardContainer = styled.div`
    width: 300px;
    height: 500px;
    padding: 20px;
    margin: 0;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: #d8d8d8;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        width: 260px;
        height: 400px;
        padding: 15px;
    }

    @media (max-width: 480px) {
        width: 240px;
        height: 400px;
    }
`;

const BookImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        height: 180px;
    }
`;

const GroupTitle = styled.div`
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 1.3;
    height: 2.6em;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }
`;

const BookTitle = styled.p`
    font-size: 1rem;
    color: #555;
    margin: 0 0 4px 0;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const Author = styled.p`
    font-size: 0.8rem;
    color: #888;
    margin: 0 0 8px 0;
`;

const HostInfo = styled.p`
    font-size: 0.8rem;
    color: #666;
    margin: 0 0 auto 0;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid #eee;
`;

const GroupCard = ({ group, isHost, children }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    return (
        <CardContainer
            onClick={() => navigate(`/chattingroom/${group.roomId}/${userId}`)}
        >
            <BookImage src={group.thumbnail} alt={group.bookTitle} />
            <GroupTitle>{group.roomTitle}</GroupTitle>
            <BookTitle>{group.bookTitle}</BookTitle>
            <Author>저자: {group.author}</Author>
            {!isHost && <HostInfo>{`호스트: ${group.hostNickname}`}</HostInfo>}
            <InfoContainer>{children}</InfoContainer>
        </CardContainer>
    );
};

export default GroupCard;
