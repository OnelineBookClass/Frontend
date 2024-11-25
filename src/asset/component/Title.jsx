import React from "react";
import styled from "styled-components";
import CloseButton from "./CloseButton";

const TitleContainer = styled.div`
    display: flex;
    font-weight: bold;
    align-items: center;
    padding-top: 1.5rem;
    font-size: clamp(1rem, 5vw, 2rem);
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

function Title({ children }) {
    return (
        <TitleContainer>
            <CloseButton />
            {children}
        </TitleContainer>
    );
}

export default Title;
