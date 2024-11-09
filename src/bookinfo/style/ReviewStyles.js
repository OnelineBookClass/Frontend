import styled from "styled-components";

export const ReviewsSection = styled.section`
    margin-bottom: 30px;
`;

export const SectionTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 15px;
`;

export const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ReviewItem = styled.div`
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const ReviewUser = styled.span`
    font-weight: bold;
`;

export const Rating = styled.div`
    color: #ffd700;
`;

export const ReviewContent = styled.p`
    margin-bottom: 10px;
`;

export const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #666;
`;
