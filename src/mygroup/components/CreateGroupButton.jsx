import styled from "styled-components";

const StyledButton = styled.button`
    width: 280px;
    height: 280px;
    padding: 20px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    background: none;
    color: #666;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #f5f5f5;
    }
`;

const CreateGroupButton = ({ onClick }) => {
    return <StyledButton onClick={onClick}>+ 모임 열기</StyledButton>;
};

export default CreateGroupButton;
