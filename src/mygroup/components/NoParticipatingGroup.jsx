import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

const StyledContainer = styled.div`
    width: clamp(220px, 25vw, 280px);
    height: clamp(300px, 40vh, 600px);
    border: 2px dashed ${(props) => (props.isDark ? "#ff9933" : "#ccc")};
    border-radius: 15px;
    background: none;
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
    color: ${(props) => (props.isDark ? "#ff9933" : "#666")};
    font-size: 1rem;
    margin: 0;
    padding: 0 20px;
`;

const NoParticipatingGroup = () => {
    const { isDark } = useTheme();
    return (
        <StyledContainer isDark={isDark}>
            <MessageText isDark={isDark}>참여한 모임이 없어요.</MessageText>
            <MessageText isDark={isDark}>모임에 참여해보세요!</MessageText>
        </StyledContainer>
    );
};

export default NoParticipatingGroup;
