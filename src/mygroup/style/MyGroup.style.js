import styled from "styled-components";

export const Container = styled.div`
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 1rem auto 2rem;
    padding: 0 1rem;
    position: relative;

    @media (max-width: 768px) {
        margin: 0.5rem auto 1.5rem;
    }
`;

export const BookIcon = styled.div`
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
    font-size: clamp(1.1rem, 4vw, 1.4rem);
    margin: 0.5rem 0 1.5rem;
    text-align: center;
    word-break: keep-all;
    line-height: 1.4;
    color: #333;
`;

export const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
    min-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    padding: 0 1rem;

    @media (max-width: 768px) {
        min-height: 300px;
        padding: 0 0.5rem;
    }
`;

export const NavButton = styled.button`
    position: absolute;
    border: none;
    background: none;
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    cursor: pointer;
    height: 100%;
    padding: 0 0.5rem;
    z-index: 1;
    color: #666;
    transition: all 0.3s ease;

    &:hover {
        color: #333;
    }

    &:first-child {
        left: 0;
    }

    &:last-child {
        right: 0;
    }

    @media (max-width: 768px) {
        padding: 0 0.3rem;
    }
`;

export const ToggleContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    justify-content: center;

    @media (max-width: 768px) {
        gap: 0.3rem;
    }
`;

export const ToggleButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    background-color: ${props => props.active ? '#007bff' : '#f0f0f0'};
    color: ${props => props.active ? 'white' : '#666'};
    transition: all 0.3s ease;
    font-size: clamp(0.8rem, 1.5vw, 0.9rem);
    white-space: nowrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: 768px) {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
    }
`;

export const GroupTag = styled.span`
    background-color: #f0f0f0;
    padding: 0.3rem 0.6rem;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    color: #666;
`;

export const GroupMember = styled.span`
    color: #666;
    font-size: 0.8rem;
`;