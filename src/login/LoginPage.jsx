import React, { useState, useEffect } from "react";
import "./Login.css";
import styled, { keyframes } from "styled-components";
import kakaoLoginLogo from "../asset/image/kakao_login.png";
import LOGO from "../asset/image/Logo.png";
import LogoText from "../asset/component/LogoText";
import LeftCloud from "../asset/image/Cloud1.png";
import RightCloud from "../asset/image/Cloud2.png";

const Button = styled.button`
    display: inline-block;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transform: ${(props) =>
        props.show ? "translateY(0)" : "translateY(-20px)"};
    transition: opacity 0.5s ease, transform 0.5s ease;

    img {
        width: 80%;
        height: auto;
    }
`;

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    position: relative;
    max-width: 1000px;
    margin: 0 auto;

    &.show-login-button {
        button {
            animation: ${slideDown} 0.5s forwards;
        }
    }
`;

const flicker = keyframes`
    0%, 100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    25% {
        transform: translate(-50%, -50%) scale(1.02);
        opacity: 0.8;
    }
    50% {
        transform: translate(-50%, -50%) scale(0.98);
        opacity: 1;
    }
    75% {
        transform: translate(-50%, -50%) scale(1.02);
        opacity: 0.9;
    }
`;

const LogoWrapper = styled.div`
    position: relative;
    margin-top: 250px;
    margin-bottom: 70px;

    /* 가장 바깥쪽 원 - 연한 노란색 */
    &::before {
        content: "";
        position: absolute;
        top: -170%;
        left: 50%;
        width: 280px;
        height: 280px;
        background: rgba(255, 253, 200, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ${flicker} 4s ease-in-out infinite;
        z-index: -4;
        box-shadow: 0 0 30px rgba(255, 253, 200, 0.3),
            inset 0 0 30px rgba(255, 253, 200, 0.3);
    }

    /* 두 번째 원 - 연한 주황색 */
    &::after {
        content: "";
        position: absolute;
        top: -120%;
        left: 50%;
        width: 220px;
        height: 220px;
        background: rgba(255, 200, 100, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ${flicker} 3s ease-in-out infinite 0.5s;
        z-index: -3;
        box-shadow: 0 0 25px rgba(255, 200, 100, 0.4),
            inset 0 0 25px rgba(255, 200, 100, 0.4);
    }
`;

const ThirdCircle = styled.div`
    position: absolute;
    top: -70%;
    left: 50%;
    width: 160px;
    height: 160px;
    background: rgba(255, 160, 60, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${flicker} 3.5s ease-in-out infinite 1s;
    z-index: -2;
    box-shadow: 0 0 20px rgba(255, 160, 60, 0.5),
        inset 0 0 20px rgba(255, 160, 60, 0.5);
`;

const FourthCircle = styled.div`
    position: absolute;
    top: -20%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: rgba(255, 230, 150, 0.5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${flicker} 2.5s ease-in-out infinite 0.7s;
    z-index: -1;
    box-shadow: 0 0 15px rgba(255, 230, 150, 0.6),
        inset 0 0 15px rgba(255, 230, 150, 0.6);
`;

const LogoImage = styled.img`
    width: 100%;
    min-width: 50px; // 이미지 크기 조정
    height: auto;
    position: relative;
    z-index: 1;
    margin-top: auto;
`;

const CloudLeft = styled.img`
    position: absolute;
    top: 60px;
    left: -15px;
    width: 150px;
    height: auto;
    opacity: 0.7;
    clip-path: inset(0 0 0 10%);
    z-index: 999;
`;

const CloudRight = styled.img`
    position: absolute;
    top: 90px;
    right: 0;
    width: 150px;
    height: auto;
    opacity: 0.7;
    /* clip-path: inset(0 20% 0 0); */
    z-index: 999;
`;

export default function LoginPage() {
    const [showLoginButton, setShowLoginButton] = useState(false);

    console.log(process.env.PUBLIC_URL);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoginButton(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const kakao = () => {
        const redirectUri = `${window.location.origin}/auth/callback/kakao`;

        window.open(
            `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`,
            "_self"
        );
    };

    return (
        <Container className={showLoginButton ? "show-login-button" : ""}>
            <LogoText size='clamp(2.5rem, 2vw, 3rem)'>몽당불</LogoText>
            <LogoWrapper>
                <ThirdCircle />
                <FourthCircle />
                <LogoImage src={LOGO} alt='로고' />
            </LogoWrapper>
            <Button
                className='loginButton'
                show={showLoginButton}
                onClick={kakao}
            >
                <img src={kakaoLoginLogo} alt='카카오 로그인' />
            </Button>
            <CloudLeft src={LeftCloud} alt='왼쪽 구름' />
            <CloudRight src={RightCloud} alt='오른쪽 구름' />
        </Container>
    );
}
