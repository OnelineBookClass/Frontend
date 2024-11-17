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

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

export const WriteButton = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;

export const ReviewForm = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;

    button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:first-child {
            background-color: #28a745;
            color: white;
        }

        &:last-child {
            background-color: #dc3545;
            color: white;
        }

        &:hover {
            opacity: 0.9;
        }
    }
`;

export const RatingSelect = styled.select`
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
`;
