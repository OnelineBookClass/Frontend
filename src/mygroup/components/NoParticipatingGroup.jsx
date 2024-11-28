import styled from "styled-components";

const StyledContainer = styled.div`
    width: clamp(220px, 25vw, 280px);
    height: clamp(300px, 40vh, 600px);
    border: 2px dashed #ccc;
    border-radius: 15px;
    background: none;
    color: #666;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 auto;
`;

const MessageText = styled.p`
    text-align: center;
    color: #666;
    font-size: 1rem;
    margin: 0;
    padding: 0 20px;
`;

const NoParticipatingGroup = () => {
    return (
        <StyledContainer>
            <MessageText>참여한 모임이 없어요.</MessageText>
            <MessageText>모임에 참여해보세요!</MessageText>
        </StyledContainer>
    );
};

export default NoParticipatingGroup;
