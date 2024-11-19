import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #333;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #666;
    }
`;