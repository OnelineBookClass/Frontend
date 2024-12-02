import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../asset/component/Title";
import { useTheme } from "../context/ThemeContext";

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin: 2rem auto;
    margin-bottom: 10rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const StyledButton = styled(Button)`
    margin-top: 2rem !important;
`;

const QuizContainer = styled.div`
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const QuizChoicesGrid = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    margin-top: 1rem;
`;

const ChoiceInput = styled(TextField)`
    width: 100%;
`;

const BookCard = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin-bottom: 2rem;
`;

const BookImage = styled.img`
    width: 100px;
    height: 140px;
    object-fit: cover;
    border-radius: 4px;
`;

const BookInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BookTitle = styled.h2`
    margin: 0;
    font-size: 1.2rem;
`;

const Authors = styled.p`
    margin: 0.5rem 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

function CreateRoom() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isbn = searchParams.get("isbn");
    const bookTitle = searchParams.get("bookTitle");
    const author = searchParams.get("author");
    const userId = localStorage.getItem("userId");
    const thumbnail = location.state?.thumbnail;
    const { isDark } = useTheme();
    // TextField 공통 스타일 업데이트
    const textFieldStyle = {
        input: {
            color: isDark ? "#ffffff" : "#0d142d",
            fontFamily: "GowunDodum-Regular",
        },
        label: {
            color: isDark ? "#ffffff" : "#0d142d",
            fontFamily: "GowunDodum-Regular",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: isDark ? "#ffffff" : "#0d142d" },
            "&:hover fieldset": { borderColor: isDark ? "#ffffff" : "#0d142d" },
            "&.Mui-focused fieldset": {
                borderColor: isDark ? "#ffffff" : "#0d142d",
            },
        },
        "& label.Mui-focused": {
            color: isDark ? "#ffffff" : "#0d142d",
        },
        "& .MuiInputBase-input": {
            fontFamily: "GowunDodum-Regular",
        },
    };

    const [formData, setFormData] = useState({
        userId: userId,
        isbn: isbn,
        maximum: 10,
        intro: "",
        tag: "",
        bookTitle: bookTitle,
        roomTitle: "",
        quiz1: "",
        answer1: "",
        quiz2: "",
        answer2: "",
        quiz3: "",
        answer3: "",
        multipleChoice1: "",
        multipleChoice2: "",
        multipleChoice3: "",
    });

    const [choices, setChoices] = useState({
        quiz1: ["", "", ""],
        quiz2: ["", "", ""],
        quiz3: ["", "", ""],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChoiceChange = (quizNumber, index, value) => {
        setChoices((prev) => ({
            ...prev,
            [`quiz${quizNumber}`]: prev[`quiz${quizNumber}`].map((choice, i) =>
                i === index ? value : choice
            ),
        }));

        const choicesString = choices[`quiz${quizNumber}`].join(",");
        setFormData((prev) => ({
            ...prev,
            [`multipleChoice${quizNumber}`]: choicesString,
        }));
    };

    const handleAnswerSelect = (quizNumber, value) => {
        const adjustedValue = parseInt(value) + 1;

        setFormData((prev) => ({
            ...prev,
            [`answer${quizNumber}`]: adjustedValue,
        }));
    };

    const handleCreateRoom = async () => {
        const finalFormData = {
            ...formData,
            multipleChoice1: choices.quiz1.join(","),
            multipleChoice2: choices.quiz2.join(","),
            multipleChoice3: choices.quiz3.join(","),
        };
        console.log("finalFormData : ", finalFormData);

        try {
            const response = await axiosInstance.post(
                `/mongdangbul/rooms/newRoomSetting`,
                finalFormData
            );
            console.log("방 생성 성공:", response.data);
            alert("방 생성이 완료되었습니다!");

            navigate(`/chattingroom/${response.data.roomId}`);
        } catch (error) {
            console.error("방 생성 실패:", error);
            alert("방 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Container>
            <Title>모임 생성</Title>
            <BookCard>
                <BookImage src={thumbnail} alt={bookTitle} />
                <BookInfo>
                    <BookTitle>{bookTitle}</BookTitle>
                    <Authors>{author}</Authors>
                </BookInfo>
            </BookCard>

            <FormGroup>
                <TextField
                    fullWidth
                    label='방 제목'
                    name='roomTitle'
                    value={formData.roomTitle}
                    onChange={handleChange}
                    sx={textFieldStyle}
                />
            </FormGroup>

            <FormGroup>
                <TextField
                    fullWidth
                    label='한줄 소개'
                    name='intro'
                    value={formData.intro}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    sx={{
                        ...textFieldStyle,
                        textarea: { color: isDark ? "#ffffff" : "#0d142d" },
                    }}
                />
            </FormGroup>

            <FormGroup>
                <FormControl fullWidth>
                    <InputLabel
                        sx={{
                            color: isDark ? "#ffffff" : "#0d142d",
                            fontFamily: "GowunDodum-Regular",
                            "&.Mui-focused": {
                                color: isDark ? "#ffffff" : "#0d142d",
                            }, // 포커스 시 색상
                        }}
                    >
                        태그
                    </InputLabel>
                    <Select
                        value={formData.tag}
                        label='태그'
                        name='tag'
                        onChange={handleChange}
                        sx={{
                            color: isDark ? "#ffffff" : "#0d142d",
                            fontFamily: "GowunDodum-Regular",
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: isDark ? "#ffffff" : "#0d142d",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: isDark ? "#ffffff" : "#0d142d",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: isDark ? "#ffffff" : "#0d142d",
                            },
                            ".MuiSvgIcon-root": {
                                color: isDark ? "#ffffff" : "#0d142d  ",
                            },
                        }}
                    >
                        <MenuItem
                            value='소설'
                            sx={{ fontFamily: "GowunDodum-Regular" }}
                        >
                            소설
                        </MenuItem>
                    </Select>
                </FormControl>
            </FormGroup>

            {[1, 2, 3].map((quizNum) => (
                <QuizContainer key={quizNum}>
                    <FormGroup>
                        <TextField
                            fullWidth
                            label={`QUIZ ${quizNum}`}
                            name={`quiz${quizNum}`}
                            value={formData[`quiz${quizNum}`]}
                            onChange={handleChange}
                            sx={textFieldStyle}
                        />
                    </FormGroup>

                    <QuizChoicesGrid>
                        {[0, 1, 2].map((choiceIndex) => (
                            <>
                                <FormControlLabel
                                    key={`radio-${choiceIndex}`}
                                    value={choiceIndex.toString()}
                                    control={
                                        <Radio
                                            checked={
                                                formData[`answer${quizNum}`] ===
                                                choiceIndex.toString()
                                            }
                                            onChange={(e) =>
                                                handleAnswerSelect(
                                                    quizNum,
                                                    e.target.value
                                                )
                                            }
                                            sx={{
                                                color: isDark
                                                    ? "#ffffff"
                                                    : "#0d142d",
                                                "&.Mui-checked": {
                                                    color: isDark
                                                        ? "#ffffff"
                                                        : "#0d142d",
                                                },
                                            }}
                                        />
                                    }
                                    label={`보기 ${choiceIndex + 1}`}
                                    sx={{
                                        color: isDark ? "#ffffff" : "#0d142d",
                                        fontFamily: "GowunDodum-Regular",
                                        "& .MuiFormControlLabel-label": {
                                            fontFamily: "GowunDodum-Regular",
                                        },
                                    }}
                                />
                                <ChoiceInput
                                    key={`input-${choiceIndex}`}
                                    value={
                                        choices[`quiz${quizNum}`][choiceIndex]
                                    }
                                    onChange={(e) =>
                                        handleChoiceChange(
                                            quizNum,
                                            choiceIndex,
                                            e.target.value
                                        )
                                    }
                                    variant='outlined'
                                    size='small'
                                    sx={{
                                        ...textFieldStyle,
                                        "& .MuiInputBase-input": {
                                            fontFamily: "GowunDodum-Regular",
                                            color: isDark
                                                ? "#ffffff"
                                                : "#0d142d",
                                        },
                                    }}
                                />
                            </>
                        ))}
                    </QuizChoicesGrid>
                </QuizContainer>
            ))}

            <ButtonWrapper>
                <StyledButton
                    variant='contained'
                    color='primary'
                    onClick={handleCreateRoom}
                    sx={{
                        backgroundColor: isDark ? "#ff9933" : "#1A293F",
                        color: isDark ? "#1A293F" : "#ffffff",
                        fontFamily: "GowunDodum-Regular",
                        fontWeight: "bold",
                        fontSize: "clamp(1rem, 5vw, 1.2rem)",
                        width: "50%",
                    }}
                >
                    방 생성
                </StyledButton>
            </ButtonWrapper>
        </Container>
    );
}

export default CreateRoom;
