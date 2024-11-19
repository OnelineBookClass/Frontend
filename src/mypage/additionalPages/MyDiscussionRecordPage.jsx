import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BookItem from "./component/BookItem";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Title,
    BackButton,
    TitleContainer,
} from "./style/HeaderStyle";

function MyDiscussionRecordPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <TitleContainer>
                <BackButton onClick={() => navigate("/mypage")}>
                    <FaArrowLeft />
                </BackButton>
                <Title>관심 도서 목록</Title>
            </TitleContainer>
        </Container>
    );
}

export default MyDiscussionRecordPage;
