import styled from "styled-components";

export const BookHead = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    position: relative;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
    color: #0d142d;
`;

export const Author = styled.p`
    color: #c2c2c2;
`;

export const Publisher = styled.p`
    color: #c1c1c1;
    font-size: 14px;
`;

export const BlurBackground = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    background: #f5f5f5;
`;

export const BlurredImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    filter: blur(20px);
    opacity: 0.5;
`;

export const ContentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`;

export const BookImage = styled.img`
    width: 200px;
    height: 280px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transform: translateY(-50px);
`;

export const HeartButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 2;
    padding: 10px;

    &:hover {
        transform: scale(1.1);
    }
`;

export const BookDetails = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    z-index: 1;
`;