import styled from "styled-components";

export const ReviewsSection = styled.section`
    margin-bottom: 30px;
    width: 95%;
    margin: 0 auto;
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
    border: ${({ isDark }) =>
        `2px solid ${isDark ? "rgb(255, 255, 255, 0.1)" : "rgb(0, 0, 0, 0.1)"}`};
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
    display: flex;
    justify-content: flex-end;
    gap: 2px;
    font-size: 16px;
    
    span {
        line-height: 1;
    }
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
    gap: 20px;
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



export const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    padding-bottom: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;

    button {
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #f0f0f0;
        }

        &:first-child {
            border-color: #8e0202;
            color: #8e0202;

            &:hover {
                background: #8e0202;
                color: white;
            }
        }
    }
`;

export const StarRatingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
`;

export const StarButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: ${props => props.filled ? '#ffd700' : '#ddd'};
    transition: color 0.2s;
    padding: 0;
    line-height: 1;

    &:hover {
        transform: scale(1.1);
    }
`;

export const TextAreaContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 10px 0;
`;

export const CharCount = styled.span`
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 12px;
    color: #666;
`;

export const ReviewForm = styled.div`
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    
    ${StarRatingContainer} {
        margin-bottom: 15px;
    }
`;
