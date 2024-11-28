import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

export const RoomHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
`;

export const BookInfo = styled.div`
    display: flex;
    gap: 20px;
`;

export const BookCover = styled.img`
    width: clamp(100px, 20vw, 200px);
    height: clamp(110px, 30vh, 300px);
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const BookDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Title = styled.h1`
    font-size: clamp(1rem, 2vw, 1.5rem);
    margin: 0;
`;

export const Author = styled.p`
    font-size: 18px;
    color: #666;
    margin: 0;
`;

export const Tag = styled.span`
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 14px;
    width: fit-content;
`;

export const HostInfo = styled.div`
    font-size: 16px;
    color: #666;
    padding: 5px 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
`;

export const InfoContainer = styled.div`
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const InfoItem = styled.div`
    margin-bottom: 20px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const Label = styled.div`
    font-weight: 600;
    color: #495057;
    margin-bottom: 8px;
    font-size: 16px;
`;

export const Value = styled.div`
    color: #212529;
    font-size: 15px;
    line-height: 1.5;
    
    ${props => props.isParticipants && `
        font-weight: 600;
        color: #007bff;
    `}
`;

export const JoinButton = styled.button`
    width: 100%;
    padding: 15px;
    margin-top: 30px;
    background-color: ${props => props.disabled ? '#dee2e6' : '#007bff'};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => props.disabled ? '#dee2e6' : '#0056b3'};
    }

    &:active {
        transform: ${props => props.disabled ? 'none' : 'scale(0.98)'};
    }
`;

export const QuizContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

export const QuizTitle = styled.h2`
    color: #333;
    margin-bottom: 20px;
`;

export const QuizQuestion = styled.p`
    font-size: 20px;
    margin-bottom: 30px;
`;

export const ChoicesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: 0 auto;
`;

export const ChoiceButton = styled.button`
    padding: 15px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: 16px;
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};

    &:hover {
        background-color: ${(props) =>
            props.disabled ? "#f8f9fa" : "#e9ecef"};
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const OverlayContent = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;

    h2 {
        margin-bottom: 20px;
        color: #333;
    }
`;

export const OverlayButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ResultMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    font-size: 20px;
    color: ${(props) => (props.correct ? "#28a745" : "#dc3545")};

    svg {
        font-size: 24px;
    }
`;
