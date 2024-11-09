import styled from "styled-components";

export const BookHead = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
`;

export const BookImage = styled.img`
    width: 150px;
    height: 200px;
    object-fit: cover;
`;

export const BookDetails = styled.div`
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
