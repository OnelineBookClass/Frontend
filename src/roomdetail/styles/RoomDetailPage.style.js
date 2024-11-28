import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

export const RoomHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 50px;
`;

export const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
`;

export const BookCoverWrapper = styled.div`
    position: relative;
    width: clamp(200px, 30vw, 300px);
    height: clamp(250px, 40vh, 400px);
    margin-bottom: -50px;
`;

export const BookCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const BookCoverOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
`;

export const Title = styled.h1`
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    margin: 0;
    color: white;
    text-align: left;
    z-index: 1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const Author = styled.p`
    position: absolute;
    top: 45px;
    left: 20px;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 5px 0;
    text-align: left;
    z-index: 1;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const InfoContainer = styled.div`
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 30px 20px 20px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.1);
    position: relative;
`;

export const InfoContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 15px;

    & > div:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
    }
    & > div:nth-child(1) {
        grid-column: 1;
        grid-row: 1;
    }
    & > div:nth-child(2) {
        grid-column: 2;
        grid-row: 1;
    }
    & > div:nth-child(4) {
        grid-column: 1;
        grid-row: 2;
    }
`;

export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const Label = styled.div`
    font-size: clamp(0.9rem, 1.5vw, 1.2rem);
    color: #666;
`;

export const Value = styled.div`
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: #333;
    font-weight: ${props => props.isParticipants || props.isHostRating ? '600' : 'normal'};
    color: ${props => props.isParticipants ? '#ff9933' : props.isHostRating ? '#ff9933' : '#333'};
`;

export const Tag = styled.span`
    background-color: #ff9933;
    color: #111;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
`;

export const TagContainer = styled.div`
    margin-bottom: 10px;
`;

export const Description = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: #666;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
`;

export const HostInfo = styled.div`
    font-size: 0.9rem;
    color: #666;
    padding: 8px 15px;
    background-color: #f8f9fa;
    border-radius: 20px;
    margin: 10px 0;
`;

export const JoinButton = styled.button`
    width: 100%;
    padding: 15px;
    margin-top: 30px;
    background-color: ${props => props.disabled ? '#dee2e6' : '#1A293F'};
    color: ${props => props.disabled ? '#666' : '#ff9933'};
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => props.disabled ? '#dee2e6' : '#1A293F'};
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
    color: #ff9933;
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
