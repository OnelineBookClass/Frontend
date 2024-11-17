import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 2rem auto;
    margin-bottom : 10rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    background-color: #f9f9f9;
    
`;

const Title = styled.h1`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const StyledButton = styled(Button)`
    margin-top: 2rem !important;
`;

function CreateRoom() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;

    // Form state
    const [formData, setFormData] = useState({
        bookTitle: "",
        roomTitle: "",
        introduction: "",
        publisher: "",
        quiz1: "",
        quiz1Solution: "",
        multipleChoice1: "",
        multipleChoice2: "",
        multipleChoice3: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateRoom = async () => {
        const requestData = {
            userId,
            bookTitle: formData.bookTitle,
            roomTitle: formData.roomTitle,
            introduction: formData.introduction,
            publisher: formData.publisher,
            quiz: [
                {
                    quiz1: formData.quiz1,
                    quiz1Solution: parseInt(formData.quiz1Solution, 10),
                    multipleChoice1: formData.multipleChoice1,
                    multipleChoice2: formData.multipleChoice2,
                    multipleChoice3: formData.multipleChoice3,
                },
            ],
        };

        try {
            const response = await axiosInstance.post(
                `/mongdangbul/rooms/newRoomSetting`,
                requestData
            );
            console.log("방 생성 성공:", response.data);
            alert("방 생성이 완료되었습니다!");
            navigate("/"); // 방의 페이지로 이동 예정 
        } catch (error) {
            console.error("방 생성 실패:", error);
            alert("방 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Container>
            <Title>토론방 생성</Title>
            <FormGroup>
                <TextField
                    fullWidth
                    label="책 제목"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="방 제목"
                    name="roomTitle"
                    value={formData.roomTitle}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="방 소개"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="출판사"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="퀴즈 질문"
                    name="quiz1"
                    value={formData.quiz1}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="퀴즈 정답 (숫자)"
                    name="quiz1Solution"
                    type="number"
                    value={formData.quiz1Solution}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="보기 1"
                    name="multipleChoice1"
                    value={formData.multipleChoice1}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="보기 2"
                    name="multipleChoice2"
                    value={formData.multipleChoice2}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <TextField
                    fullWidth
                    label="보기 3"
                    name="multipleChoice3"
                    value={formData.multipleChoice3}
                    onChange={handleChange}
                />
            </FormGroup>
            <StyledButton
                variant="contained"
                color="primary"
                onClick={handleCreateRoom}
            >
                방 생성
            </StyledButton>
        </Container>
    );
}

export default CreateRoom;
// 임시 스타일링