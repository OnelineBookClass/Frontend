import styled from "styled-components";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CloseButtonContainer = styled.button`
    display: flex;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 3rem;
`;

function CloseButton() {
    const navigate = useNavigate();
    return (
        <CloseButtonContainer onClick={() => navigate(-1)}>
            <MdOutlineCancel />
        </CloseButtonContainer>
    );
}

export default CloseButton;
