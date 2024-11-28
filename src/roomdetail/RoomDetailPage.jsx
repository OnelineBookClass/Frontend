import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import styled from "styled-components";
import RoomInfo from "./components/RoomInfo";
import Quiz from "./components/Quiz";
import ErrorOverlay from "./components/ErrorOverlay";
import { useTheme } from "../context/ThemeContext";
import Title from "../asset/component/Title";

function RoomDetailPage() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetail, setRoomDetail] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [quizResult, setQuizResult] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showFailMessage, setShowFailMessage] = useState(false);
    const userId = localStorage.getItem("userId");
    const [participating, setParticipating] = useState(false);
    const { isDark } = useTheme();

    useEffect(() => {
        try {
            axiosInstance
                .get(`/mongdangbul/rooms/roomdetail/${roomId}`)
                .then((res) => {
                    setRoomDetail(res.data);
                    console.log(res.data);
                });
        } catch (error) {
            console.error("방 상세 정보 로딩 실패:", error);
        }

        checkParticipating();
    }, [roomId]);

    const checkParticipating = async () => {
        try {
            const response = await axiosInstance.get(
                "/mongdangbul/quiz/participating",
                {
                    params: {
                        userId,
                        roomId,
                    },
                }
            );
            setParticipating(response.data.participating);
        } catch (error) {
            console.error("퀴즈 참여 가능 여부 확인 실패:", error);
        }
    };

    const handleJoin = async () => {
        try {
            const response = await axiosInstance.get(
                "/mongdangbul/quiz/check/quizFail",
                {
                    params: {
                        userId,
                        roomId,
                    },
                }
            );

            if (response.data.hasFailed) {
                setShowFailMessage(true);
            } else {
                if (participating) {
                    navigate(`/chattingroom/${roomId}`);
                } else {
                    setShowQuiz(true);
                }
            }
        } catch (error) {
            console.error("퀴즈 참여 가능 여부 확인 실패:", error);
        }
    };

    const handleQuizAnswer = async (selectedAnswer) => {
        const correctAnswer = roomDetail.quizzes[currentQuiz].answer;
        const isCorrect = selectedAnswer === correctAnswer;

        setQuizResult(isCorrect ? "correct" : "incorrect");

        if (!isCorrect) {
            try {
                await axiosInstance.post("/mongdangbul/quiz/quizComplete", {
                    isPass: false,
                    roomId,
                    userId,
                });
                setTimeout(() => {
                    setShowOverlay(true);
                }, 1000);
            } catch (error) {
                console.error("퀴즈 결과 저장 실패:", error);
            }
        } else {
            setTimeout(async () => {
                setQuizResult(null);
                if (currentQuiz < 2) {
                    setCurrentQuiz(currentQuiz + 1);
                } else {
                    try {
                        // 퀴즈 통과 결과 저장
                        await axiosInstance.post(
                            "/mongdangbul/quiz/quizComplete",
                            {
                                isPass: true,
                                roomId,
                                userId,
                            }
                        );

                        // 참여자 테이블에 추가
                        await axiosInstance.post(
                            "/mongdangbul/rooms/participant",
                            {
                                roomId,
                                userId,
                                disconnectFlag: false,
                            }
                        );

                        navigate(`/chattingroom/${roomId}`);
                    } catch (error) {
                        console.error(
                            "퀴즈 결과 저장 또는 참여자 등록 실패:",
                            error
                        );
                    }
                }
            }, 1000);
        }
    };

    if (!roomDetail) return <div>로딩 중...</div>;

    return (
        <Container>
            {showOverlay && (
                <ErrorOverlay
                    message='퀴즈를 틀려서 방에 참여하실 수 없습니다!'
                    onConfirm={() => navigate("/main")}
                />
            )}
            {showFailMessage && (
                <ErrorOverlay
                    message='퀴즈를 틀린 방은 참여하실 수 없습니다.'
                    onConfirm={() => setShowFailMessage(false)}
                />
            )}

            {!showQuiz ? (
                <>
                    <Title> 모임 상세 </Title>
                    <RoomInfo
                        roomDetail={roomDetail}
                        onJoin={handleJoin}
                        participating={participating}
                    />
                </>
            ) : (
                <>
                    <Title> 퀴즈 </Title>
                    <Quiz
                        quiz={roomDetail.quizzes[currentQuiz]}
                        currentQuiz={currentQuiz}
                        onAnswer={handleQuizAnswer}
                        quizResult={quizResult}
                    />
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

export default RoomDetailPage;
