import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
    font-weight: bold;
    font-size: clamp(1rem, 5vw, 2rem);
    text-align: left;
    align-items: flex-start;
    margin-bottom: 1rem;
`;

function Title({ children }) {
    return (
        <TitleContainer>
            {children}
        </TitleContainer>);
}

export default Title;
