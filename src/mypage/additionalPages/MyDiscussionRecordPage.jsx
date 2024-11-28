import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BookItem from "./component/BookItem";
import { useNavigate } from "react-router-dom";
import { Container, TitleContainer } from "./style/HeaderStyle";
import Title from "../../asset/component/Title";

function MyDiscussionRecordPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <TitleContainer>
                <Title>나의 토론 기록</Title>
            </TitleContainer>
        </Container>
    );
}

export default MyDiscussionRecordPage;
