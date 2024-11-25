import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import { FaHome } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FaRegLaughSquint } from "react-icons/fa";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1000px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${({ isDark }) => (isDark ? "#0d142d" : "#ffffff")};
    padding: 20px 0;
    box-shadow: 0 -2px 0 rgba(255, 255, 255, 0.2);
    margin: 0 auto;
`;

const MenuName = styled.span`
    font-size: 20px;
    margin-top: 4px;
`;

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #666666;
    padding: 5px 0;
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
        color: ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};

        span {
            max-width: 100px;
            opacity: 1;
        }
    }

    &.active {
        color: ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};
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
            <NavItem to='/' activeClassName='active' isDark={isDark}>
                <FaHome />
                <MenuName>홈</MenuName>
            </NavItem>
            <NavItem to='/mygroup' activeClassName='active' isDark={isDark}>
                <SiBookstack />
                <MenuName>나의 모임</MenuName>
            </NavItem>
            <NavItem to='/mypage' activeClassName='active' isDark={isDark}>
                <FaRegLaughSquint />
                <MenuName>마이페이지</MenuName>
            </NavItem>
        </Container>
    );
}
