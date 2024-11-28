import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../context/ThemeContext";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; //1A293F //ff9933
    background-color: ${(props) => (props.isDark ? "#1A293F" : "#ffffff")};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid ${(props) => (props.isDark ? "#ffffff" : "#ff9933")};
    border-top: 5px solid ${(props) => (props.isDark ? "#ff9933" : "#ffffff")};
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
`;

const LoadingOverlay = () => {
    const { isDark } = useTheme();
    return (
        <Overlay isDark={isDark}>
            <Spinner isDark={isDark} />
        </Overlay>
    );
};

export default LoadingOverlay;
