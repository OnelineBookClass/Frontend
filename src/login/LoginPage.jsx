import React, { useState, useEffect } from "react";
import "./Login.css";
import styled, { keyframes } from "styled-components";
import kakaoLoginLogo from "../asset/image/kakao_login.png";
import LOGO from "../asset/image/Logo.png";

const Button = styled.button`
    display: inline-block;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transform: ${(props) =>
        props.show ? "translateY(0)" : "translateY(-20px)"};
    transition: opacity 0.5s ease, transform 0.5s ease;
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
    background-color: #ffffff;
    color: #000000;

    &.show-login-button {
        button {
            animation: ${slideDown} 0.5s forwards;
        }
    }
`;

const LogoImage = styled.img`
    width: 300px;
    height: auto;
    margin-bottom: 20px;
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
        window.open(
            `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:8080/auth/callback/kakao&response_type=code`,
            "_self"
        );
    };

    return (
        <Container className={showLoginButton ? "show-login-button" : ""}>
            <h1>아래로 몽당불 시작하기</h1>
            <LogoImage src={LOGO} alt='카카오 로그인' />
            <Button
                className='loginButton'
                show={showLoginButton}
                onClick={kakao}
            >
                <img src={kakaoLoginLogo} alt='카카오 로그인' />
            </Button>
        </Container>
    );
}
