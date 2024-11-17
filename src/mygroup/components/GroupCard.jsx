import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    width: 100%;
    max-width: 280px;
    height: 400px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 90%;
        height: 350px;
        padding: 15px;
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

const GroupTitle = styled.h2`
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const BookTitle = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    return (
        <CardContainer>
            <BookImage src={group.thumbnail} alt={group.bookTitle} />
            <GroupTitle>{group.roomTitle}</GroupTitle>
            <BookTitle>{group.bookTitle}</BookTitle>
            <Author>저자: {group.author}</Author>
            <HostInfo>
                {isHost ? "내가 만든 모임" : `호스트: ${group.hostNickname}`}
            </HostInfo>
            <InfoContainer>{children}</InfoContainer>
        </CardContainer>
    );
};

export default GroupCard;
