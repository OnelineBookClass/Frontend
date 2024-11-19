import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import styled from "styled-components";
import RoomInfo from "./components/RoomInfo";
import Quiz from "./components/Quiz";
import ErrorOverlay from "./components/ErrorOverlay";

function RoomDetailPage() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetail, setRoomDetail] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizResult, setQuizResult] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

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
    }, [roomId]);

    const handleJoin = () => {
        setShowQuiz(true);
    };

    const handleQuizAnswer = (selectedAnswer) => {
        const correctAnswer = roomDetail.quizzes[currentQuiz].answer;
        const isCorrect = selectedAnswer === correctAnswer;

        setQuizResult(isCorrect ? "correct" : "incorrect");

        if (isCorrect) {
            setTimeout(() => {
                setQuizResult(null);
                if (currentQuiz < 2) {
                    setCurrentQuiz(currentQuiz + 1);
                } else {
                    navigate(`/chattingroom/${roomId}/1234/테스트유저`);
                }
            }, 1000);
        } else {
            setTimeout(() => {
                setShowOverlay(true);
            }, 1000);
        }
    };

    if (!roomDetail) return <div>로딩 중...</div>;

    return (
        <Container>
            {showOverlay && <ErrorOverlay onConfirm={() => navigate("/")} />}

            {!showQuiz ? (
                <RoomInfo roomDetail={roomDetail} onJoin={handleJoin} />
            ) : (
                <Quiz
                    quiz={roomDetail.quizzes[currentQuiz]}
                    currentQuiz={currentQuiz}
                    onAnswer={handleQuizAnswer}
                    quizResult={quizResult}
                />
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
