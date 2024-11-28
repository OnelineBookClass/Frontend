import styled from "styled-components";

const LogoText = styled.div`
    font-size: ${(props) =>
        props.size ? props.size : "clamp(1.5rem, 2vw, 3rem)"};
    font-weight: bold;
    color: #ff9933;
    text-shadow: 0 0 10px rgba(255, 153, 51, 0.5),
        0 0 20px rgba(255, 153, 51, 0.3), 0 0 30px rgba(255, 153, 51, 0.2);
    animation: glow 2s ease-in-out infinite;

    @keyframes glow {
        0%,
        100% {
            text-shadow: 0 0 10px rgba(255, 153, 51, 0.5),
                0 0 20px rgba(255, 153, 51, 0.3);
        }
        50% {
            text-shadow: 0 0 15px rgba(255, 153, 51, 0.7),
                0 0 25px rgba(255, 153, 51, 0.5);
        }
    }
`;

export default LogoText;
