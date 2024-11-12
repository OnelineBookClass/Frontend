import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Header = styled.div`
    margin-bottom: 40px;
`;

export const BookIcon = styled.div`
    font-size: 24px;
    margin-bottom: 10px;
`;

export const Title = styled.h1`
    font-size: 18px;
`;

export const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
`;

export const NavButton = styled.button`
    position: absolute;
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    height: 100%;
    padding: 0 20px;
    z-index: 1;

    &:first-child {
        left: 0;
    }

    &:last-child {
        right: 0;
    }
`;