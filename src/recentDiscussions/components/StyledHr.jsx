import React from 'react';
import styled from 'styled-components';

const Divider = styled.hr`
    width: 100%;
    border: 0;
    border-top: 2px solid #ccc;
    margin: 0;
    margin-bottom: 1rem;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
`;

function StyledHr() {
    return (
        <Divider />
    );
}

export default StyledHr;
