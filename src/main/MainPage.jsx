import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.div`
    font-weight: bold;
    font-size: clamp(1rem, 5vw, 2rem);
`;

function MainPage() {
    return (
        <Container>
            <Title>MainPage</Title>
        </Container>
    );
}

export default MainPage;
