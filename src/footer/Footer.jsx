import React from "react";
import styled from "styled-components";
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
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
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

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 0;

    svg {
        font-size: clamp(1rem, 7vw, 2rem);
    }

    span {
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: max-width 0.7s ease, opacity 0.3s ease;
        opacity: 0;
    }

    &:hover {
        color: ${({ isDark }) => (isDark ? "#0d142d" : "#ffffff")};

        span {
            max-width: 100px;
            opacity: 1;
        }
    }

    &.active {
        color: ${({ isDark }) => (isDark ? "#0d142d" : "#ffffff")};
        background: none;

        span {
            max-width: 100px;
            opacity: 1;
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
