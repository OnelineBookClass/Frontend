import styled from "styled-components";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CloseButtonContainer = styled.button`
    display: flex;
    border: none;
    background: none;
    cursor: pointer;
    font-size: clamp(2rem, 5vw, 3rem);
    color: ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};
`;

function CloseButton() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    return (
        <CloseButtonContainer onClick={() => navigate(-1)} isDark={isDark}>
            <MdOutlineCancel />
        </CloseButtonContainer>
    );
}

export default CloseButton;
