import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
`;

const Dot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? "#000" : "#ccc")};
`;

const Indicators = ({ total, current }) => {
    return (
        <Container>
            {[...Array(total)].map((_, idx) => (
                <Dot key={idx} active={current === idx} />
            ))}
        </Container>
    );
};

export default Indicators;
