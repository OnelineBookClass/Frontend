import styled from "styled-components";

const StyledContainer = styled.div`
    width: 280px;
    height: 400px;
    border: 2px dashed #ccc;
    border-radius: 15px;
    background: none;
    color: #666;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: 240px;
        height: 350px;
    }

    @media (max-width: 480px) {
        width: 220px;
        height: 330px;
    }
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
