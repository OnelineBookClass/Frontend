import styled from "styled-components";

export const BookHead = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    position: relative;
`;

export const BookImage = styled.img`
    width: 150px;
    height: 200px;
    object-fit: cover;
`;

export const BookDetails = styled.div`
    margin-right: 2rem;
    flex: 1;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

export const Author = styled.p`
    color: #666;
    margin-bottom: 5px;
`;

export const Publisher = styled.p`
    color: #666;
`;

export const HeartButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.isLiked ? '#ff0000' : '#cccccc'};
    transition: color 0.3s ease;
    
    &:hover {
        opacity: 0.8;
    }
`;
