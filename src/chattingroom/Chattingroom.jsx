import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";
import { FaSignOutAlt } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

const ChattingRoom = () => {
    const userId = localStorage.getItem("userId");
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const messageEndRef = useRef(null);
    const [participants, setParticipants] = useState([]);
    const [isHost, setIsHost] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [isMaxLength, setIsMaxLength] = useState(false);

    // 소켓 연결 및 이벤트 리스너 설정
    useEffect(() => {
        const newSocket = io("https://mongdangbul.store", {
            // const newSocket = io("http://localhost:3000", {
            transports: ["websocket"],
            withCredentials: true,
            forceNew: true,
            timeout: 5000,
            query: {
                userId,
                roomId,
            },
        });
        setSocket(newSocket);

        // 소켓 연결 성공 시 참여자 확인 요청
        newSocket.on("connect", () => {
            console.log("소켓 연결 성공!");
            newSocket.emit("checkParticipant", { userId, roomId });
        });

        // 권한 없음 응답 처리
        newSocket.on("unauthorized", (data) => {
            alert(data.message);
            if (data.redirect) {
                navigate(`/roomdetail/${roomId}`);
            }
        });

        // 권한 확인됨 응답 처리
        newSocket.on("authorized", () => {
            console.log("권한 확인됨, 방 참여 시도");
            // 닉네임도 함께 전송
            const nickName = localStorage.getItem("nickName");
            newSocket.emit("joinRoom", { roomId, userId, nickName });
        });

        // 채팅 메시지 수신 확인
        newSocket.on("chat", (message) => {
            setMessages((prev) => [
                ...prev,
                {
                    userId: message.userId,
                    nickName: message.nickName,
                    msg: message.msg,
                    chatTime: new Date(message.chatTime),
                },
            ]);
        });

        // 사용자 입장 알림
        newSocket.on("userJoined", (data) => {
            console.log("사용자 입장 이벤트 수신:", data);
            setMessages((prev) => [
                ...prev,
                {
                    nickName: "System",
                    msg: data.message,
                    chatTime: new Date(),
                },
            ]);
        });

        // 사용자 퇴장 알림
        newSocket.on("userLeft", (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    nickName: "System",
                    msg: data.message,
                    chatTime: new Date(),
                },
            ]);
        });

        // 에러 처리
        newSocket.on("error", (data) => {
            setIsLoading(false);
            console.error("소켓 에러 발생:", data);
            setError(data.message);
        });

        // 재연결 처리 추가
        newSocket.on("disconnect", () => {
            setIsJoined(false);
        });

        newSocket.on("reconnect", () => {
            newSocket.emit("joinRoom", { roomId, userId });
        });

        // 참여자 목록 업데이트 벤트
        newSocket.on("participantsList", (updatedParticipants) => {
            console.log("참여자 목록 업데이트:", updatedParticipants);
            setParticipants(updatedParticipants);
        });

        // 토론 종료 이벤트 추가
        newSocket.on("discussionEnded", (data) => {
            setIsLoading(false);
            alert(data.message);
            navigate("/main");
        });

        // joinRoomSuccess 이벤트 리스너 추가
        newSocket.on("joinRoomSuccess", (data) => {
            console.log("방 참여 성공:", data);
            setIsJoined(true);
            setIsHost(data.isHost);
            setParticipants(data.participants);

            const formattedHistory = data.chatHistory.map((msg) => ({
                userId: msg.userId,
                nickName: msg.nickName,
                msg: msg.msg,
                chatTime: new Date(msg.chatTime),
            }));
            setMessages(formattedHistory);
        });

        // 요약 결과 수신
        newSocket.on("summaryResult", (analysis) => {
            setIsLoading(false);
            console.log("토론 요약:", analysis);

            const formattedMsg = `[토론 요약]\n\n▶ 논점\n${
                analysis.논점 || "논점 없음"
            }\n\n▶ 토론자별 주장\n${
                analysis.토론자별주장
                    ? Object.entries(analysis.토론자별주장)
                          .map(([name, opinion]) => `• ${name}: ${opinion}`)
                          .join("\n")
                    : "토론자별 주장이 없습니다."
            }`;

            setMessages((prev) => [
                ...prev,
                {
                    nickName: "System",
                    msg: formattedMsg,
                    chatTime: new Date(),
                    isSummary: true,
                },
            ]);
        });

        // 컴포넌트 언마운트 시 정리
        return () => {
            if (newSocket.connected) {
                console.log("소켓 연결 종료");
                newSocket.emit("leaveRoom", { roomId, userId });
            }
            newSocket.disconnect();
            setIsJoined(false);
        };
    }, [roomId, userId, navigate]);

    // 메시지 자동 스크롤
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 메시지 입력 핸들러 수정
    const handleMessageChange = (e) => {
        const message = e.target.value;
        if (message.length <= 250) {
            setInputMessage(message);
            setIsMaxLength(false);
        } else {
            setIsMaxLength(true);
        }
    };

    // 메시지 전송 핸들러 수정
    const sendMessage = (e) => {
        e.preventDefault();
        if (
            inputMessage.trim() &&
            socket &&
            isJoined &&
            inputMessage.length <= 250
        ) {
            socket.emit("chat", {
                roomId,
                userId,
                msg: inputMessage,
            });
            setInputMessage("");
            setIsMaxLength(false);
        }
    };

    // 토론 종료 함수 추가
    const handleEndDiscussion = () => {
        if (window.confirm("정말로 토론을 종료하���겠습니까?")) {
            setIsLoading(true);
            setLoadingMessage("토론이 종료중입니다...");
            socket.emit("endDiscussion", { roomId });
        }
    };

    const handleSummary = () => {
        if (window.confirm("토론을 요약하시겠습니까?")) {
            setIsLoading(true);
            setLoadingMessage("토론 내용을 요약하고 있습니다...");
            socket.emit("summaryDiscussion", { roomId });
        }
    };

    const LoadingOverlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const LoadingSpinner = styled.div`
        background: white;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    `;

    const LoadingText = styled.p`
        color: #1a293f;
        margin: 0;
        font-size: 1rem;
    `;

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <Container>
            {isLoading && (
                <LoadingOverlay>
                    <LoadingSpinner>
                        <CircularProgress style={{ color: "#ff9933" }} />
                        <LoadingText>{loadingMessage}</LoadingText>
                    </LoadingSpinner>
                </LoadingOverlay>
            )}
            <ChatContainer>
                <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <IoMdMenu size={24} />
                </MenuButton>

                <SideMenu isOpen={isMenuOpen}>
                    <CloseButton onClick={() => setIsMenuOpen(false)}>
                        ×
                    </CloseButton>
                    <ParticipantsHeader>
                        참여자 목록 ({participants?.length || 0})
                        {isHost && (
                            <EndDiscussionButton onClick={handleEndDiscussion}>
                                토론 종료
                            </EndDiscussionButton>
                        )}
                    </ParticipantsHeader>
                    {participants?.map((participant) => (
                        <ParticipantItem key={participant.userId}>
                            {participant.profileImage && (
                                <ProfileImage
                                    src={participant.profileImage}
                                    alt={participant.nickName}
                                />
                            )}
                            <ParticipantInfo>
                                <ParticipantName>
                                    {participant.nickName}
                                </ParticipantName>
                            </ParticipantInfo>
                        </ParticipantItem>
                    ))}

                    {isHost && (
                        <>
                            <SummaryButton onClick={handleSummary}>
                                토론 요약하기
                            </SummaryButton>
                        </>
                    )}
                    <MainPageButton onClick={() => navigate("/main")}>
                        <FaSignOutAlt size={24} />
                    </MainPageButton>
                </SideMenu>

                <ChatSection>
                    <ChatBox>
                        {messages.map((message, index) => {
                            const isSystem = message.nickName === "System";

                            return (
                                <MessageBubble
                                    key={index}
                                    isMine={message.userId == userId}
                                    isSystem={isSystem}
                                    isSummary={message.isSummary}
                                >
                                    {!isSystem && !message.isSummary && (
                                        <NickName>{message.nickName}</NickName>
                                    )}
                                    <MessageText>{message.msg}</MessageText>
                                    <TimeStamp>
                                        {new Date(
                                            message.chatTime
                                        ).toLocaleTimeString()}
                                    </TimeStamp>
                                </MessageBubble>
                            );
                        })}
                        <div ref={messageEndRef} />
                    </ChatBox>

                    <Form onSubmit={sendMessage}>
                        <Input
                            value={inputMessage}
                            onChange={handleMessageChange}
                            placeholder={
                                isMaxLength
                                    ? "최대 250자까지 입력 가능합니다"
                                    : isJoined
                                    ? "메시지를 입력하세요..."
                                    : "채팅방 참여 중..."
                            }
                            disabled={!isJoined}
                            isMaxLength={isMaxLength}
                        />
                        <SendButton
                            type='submit'
                            disabled={!isJoined || isMaxLength}
                        >
                            전송
                        </SendButton>
                    </Form>
                </ChatSection>
            </ChatContainer>
        </Container>
    );
};

export default ChattingRoom;

const Container = styled.div`
    width: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px 5px;
`;

const ChatContainer = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
`;

const ChatSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const ParticipantsHeader = styled.h3`
    margin: 0 0 15px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ParticipantItem = styled.div`
    padding: 8px;
    margin: 5px 0;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
        background: #e9ecef;
    }
`;

const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    background: #ddd;
`;

const ParticipantInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ParticipantName = styled.span`
    font-weight: 500;
`;

const ChatBox = styled.div`
    height: 85vh;
    border: none;
    padding: 10px;
    overflow-y: auto;
    background: #f9f9f9;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
        margin: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: #1a293f;
        border-radius: 4px;
        border: 2px solid #f9f9f9;

        &:hover {
            background: #2a3b4f;
        }
    }
`;

const MessageBubble = styled.div`
    max-width: ${(props) => (props.isSummary ? "90%" : "70%")};
    margin: 10px 0;
    padding: 10px 15px;
    border-radius: 15px;
    font-size: clamp(0.8rem, 5vw, 1.1rem);
    background: ${(props) => {
        if (props.isSummary) return "#e6f3ff";
        if (props.isSystem) return "#f0f0f0";
        return props.isMine ? "#ff9933" : "#e9ecef";
    }};
    color: ${(props) => {
        if (props.isSummary) return "#0066cc";
        if (props.isSystem) return "#666";
        return props.isMine ? "#1a293f" : "black";
    }};
    align-self: ${(props) => {
        if (props.isSystem || props.isSummary) return "center";
        return props.isMine ? "flex-end" : "flex-start";
    }};
    margin-left: ${(props) => (props.isMine ? "auto" : "0")};
    white-space: pre-line;
    border: ${(props) => (props.isSummary ? "1px solid #b3d9ff" : "none")};
`;

const NickName = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
    opacity: 0.8;
`;

const MessageText = styled.p`
    margin: 0;
    word-wrap: break-word;
`;

const TimeStamp = styled.span`
    font-size: 0.7rem;
    opacity: 0.7;
    margin-left: 5px;
`;

const Form = styled.form`
    display: flex;
    gap: 10px;
    margin: 0 5px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;

    &::placeholder {
        color: ${(props) => (props.isMaxLength ? "#ff4444" : "#999")};
    }
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background: ${(props) => (props.disabled ? "#cccccc" : "#ff9933")};
    color: #1a293f;
    border: none;
    border-radius: 4px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: clamp(0.8rem, 5vw, 1rem);

    &:hover {
        background: ${(props) => (props.disabled ? "#cccccc" : "#ff9933")};
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    padding: 20px;
    font-size: 16px;
`;

const SummaryButton = styled.button`
    width: calc(100% - 40px);
    padding: 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    bottom: 120px;
    left: 20px;

    &:hover {
        background-color: #218838;
    }
`;

const EndDiscussionButton = styled.button`
    width: calc(100% - 40px);
    padding: 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    bottom: 70px;
    left: 20px;

    &:hover {
        background-color: #c82333;
    }
`;

const MainPageButton = styled.button`
    width: calc(100% - 40px);
    padding: 12px;
    background: none;
    color: #dc3545;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    bottom: 20px;
    left: 20px;

    &:hover {
        background-color: #c82333;
    }
`;

const MenuButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 100;

    &:hover {
        opacity: 0.7;
    }
`;

const SideMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    overflow-y: auto;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;

    &:hover {
        color: #666;
    }
`;
