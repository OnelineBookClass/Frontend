import React from "react";
import styled, { keyframes } from "styled-components";

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
    height: 100%;
    background-color: rgba(177, 177, 177, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #0d142d;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
`;

const LoadingOverlay = () => {
    return (
        <Overlay>
            <Spinner />
        </Overlay>
    );
};

export default LoadingOverlay;
