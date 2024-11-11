import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { FaRegLaughSquint } from "react-icons/fa";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #de4d25;
    padding: 20px 0;
`;

const MenuName = styled.span`
    font-size: 20px;
`;

const NavItem = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #ffffff;
    padding: 5px 10px;
    margin: 0px 10px;
    border-radius: 20px;
    transition: all 0.3s ease;
    width: 25%;

    svg {
        font-size: 24px;
    }

    span {
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: max-width 0.7s ease, opacity 0.3s ease;
        opacity: 0;
    }

    &:hover,
    &.active {
        background-color: #981e08;

        span {
            max-width: 100px;
            opacity: 1;
        }
    }
`;

export default function Footer() {
    return (
        <Container>
            <NavItem to='/' activeClassName='active'>
                <FaHome />
                <MenuName>홈</MenuName>
            </NavItem>
            <NavItem to='/mygroup' activeClassName='active'>
                <BsFillPeopleFill />
                <MenuName>나의 모임</MenuName>
            </NavItem>
            <NavItem to='/mylibrary' activeClassName='active'>
                <SiBookstack />
                <MenuName>나의 서재</MenuName>
            </NavItem>
            <NavItem to='/mypage' activeClassName='active'>
                <FaRegLaughSquint />
                <MenuName>마이페이지</MenuName>
            </NavItem>
        </Container>
    );
}
