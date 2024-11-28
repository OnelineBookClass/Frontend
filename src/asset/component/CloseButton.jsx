import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";

const CloseButtonContainer = styled.button`
    display: flex;
    border: none;
    background: none;
    cursor: pointer;
    font-size: clamp(1rem, 5vw, 2.5rem);
    color: #ff9933;
`;

function CloseButton() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    return (
        <CloseButtonContainer onClick={() => navigate(-1)} isDark={isDark}>
            <FaArrowLeft />
        </CloseButtonContainer>
    );
}

export default CloseButton;
