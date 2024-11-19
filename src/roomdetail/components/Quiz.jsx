import React from "react";
import {
    QuizContainer,
    QuizTitle,
    QuizQuestion,
    ChoicesContainer,
    ChoiceButton,
    ResultMessage,
} from "../styles/RoomDetailPage.style";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const Quiz = ({ quiz, currentQuiz, onAnswer, quizResult }) => {
    return (
        <QuizContainer>
            <QuizTitle>입장 퀴즈 {currentQuiz + 1}/3</QuizTitle>
            <QuizQuestion>{quiz.question}</QuizQuestion>
            <ChoicesContainer>
                {quiz.multipleChoice.split(",").map((choice, index) => (
                    <ChoiceButton
                        key={index}
                        onClick={() => onAnswer(index + 1)}
                        disabled={quizResult !== null}
                    >
                        {choice}
                    </ChoiceButton>
                ))}
            </ChoicesContainer>
            {quizResult && (
                <ResultMessage correct={quizResult === "correct"}>
                    {quizResult === "correct" ? (
                        <>
                            정답입니다! <IoCheckmarkCircle />
                        </>
                    ) : (
                        <>
                            오답입니다 <IoCloseCircle />
                        </>
                    )}
                </ResultMessage>
            )}
        </QuizContainer>
    );
};

// ... styled components from original file ...

export default Quiz;
