import styled from "styled-components";

const StyledButton = styled.button`
    width: 100%;
    max-width: 280px;
    height: 400px;
    padding: 20px;
    border: 2px dashed #ccc;
    border-radius: 15px;
    background: none;
    color: #666;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        width: 90%;
        height: 350px;
        padding: 15px;
    }

    &:hover {
        background: #f5f5f5;
        border-color: #999;
    }

    /* 플러스 아이콘 스타일 */
    &::before {
        content: "+";
        font-size: 2rem;
        margin-bottom: 10px;
    }
`;

const CreateGroupButton = ({ onClick }) => {
    return <StyledButton onClick={onClick}>모임 열기</StyledButton>;
};

export default CreateGroupButton;
