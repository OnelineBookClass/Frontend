import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import HomeIcon from "../asset/icon/HomeIcon.png";
import MyGroupIcon from "../asset/icon/MyGroupIcon.png";
import MyPageIcon from "../asset/icon/MyPageIcon.png";

const Container = styled.div`
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ isDark }) => (isDark ? "#ffffff" : "#1A293F")};
    padding: 20px 0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    color: ${({ isDark }) => (isDark ? "#1A293F" : "#ffffff")};
`;

const FooterWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
`;

const MenuName = styled.span`
    font-size: clamp(0.85rem, 3vw, 1.25rem);
    margin-top: 4px;
`;

const flicker = keyframes`
    0%, 100% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 153, 51, 0.5);
    }
    25% {
        opacity: 0.8;
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(255, 153, 51, 0.7);
    }
    50% {
        opacity: 0.9;
        transform: scale(0.95);
        box-shadow: 0 0 25px rgba(255, 153, 51, 0.6);
    }
    75% {
        opacity: 0.8;
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(255, 153, 51, 0.7);
    }
`;

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 0;
    color: ${({ isDark }) => (isDark ? "#1A293F" : "#ffffff")};
    position: relative;

    &::before,
    &::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.5s ease;
        transform: scale(0.7);
    }

    &::before {
        width: 55px;
        height: 55px;
        background: rgba(255, 153, 51, 0.25);
        z-index: -1;
    }

    &::after {
        width: 42px;
        height: 42px;
        background: rgba(255, 153, 51, 0.35);
        z-index: -2;
    }

    &.active {
        color: ${({ isDark }) => (isDark ? "#0d142d" : "#ffffff")};
        background: none;

        &::before,
        &::after {
            opacity: 1;
            transform: scale(1);
        }

        &::before {
            animation: ${flicker} 3s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(255, 153, 51, 0.4),
                inset 0 0 20px rgba(255, 153, 51, 0.4);
        }

        &::after {
            animation: ${flicker} 3s ease-in-out infinite 0.5s;
            box-shadow: 0 0 25px rgba(255, 153, 51, 0.5),
                inset 0 0 15px rgba(255, 153, 51, 0.5);
        }

        span {
            max-width: 100px;
            opacity: 1;
        }
    }

    // 호버 효과 추가 (선택사항)
    &:hover:not(.active) {
        &::before,
        &::after {
            opacity: 0.3;
            transform: scale(0.9);
        }
    }
`;

export default function Footer() {
    const { isDark } = useTheme();
    return (
        <Container isDark={isDark}>
            <FooterWrapper>
                <NavItem to='/main' activeClassName='active' isDark={isDark}>
                    <img src={HomeIcon} alt='홈' />
                    <MenuName>홈</MenuName>
                </NavItem>
                <NavItem to='/mygroup' activeClassName='active' isDark={isDark}>
                    <img src={MyGroupIcon} alt='나의 모임' />
                    <MenuName>나의 모임</MenuName>
                </NavItem>
                <NavItem to='/mypage' activeClassName='active' isDark={isDark}>
                    <img src={MyPageIcon} alt='마이페이지' />
                    <MenuName>마이페이지</MenuName>
                </NavItem>
            </FooterWrapper>
        </Container>
    );
}
