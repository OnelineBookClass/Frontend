import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const ChattingRoom = () => {
    const { roomId, userId, nickName } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [error, setError] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const messageEndRef = useRef(null);
    const [participants, setParticipants] = useState([]);
    const [isHost, setIsHost] = useState(false);

    // 소켓 연결 및 이벤트 리스너 설정
    useEffect(() => {
        const newSocket = io("http://localhost:3000", {
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

        // 소켓 연결 성공 시 바로 방 참여 요청
        newSocket.on("connect", () => {
            console.log("소켓 연결 성공!");
            newSocket.emit("joinRoom", { roomId, userId });
        });

        // 채팅 메시지 수신 확인
        newSocket.on("chat", (message) => {
            console.log("새 메시지 수신:", message);
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
            console.error("소켓 에러 발생:", data);
            setError(data.message);
        });

        // 재연결 처리 추가
        newSocket.on("disconnect", () => {
            setIsJoined(false);
            console.log("서버와 연결이 끊어졌습니다.");
        });

        newSocket.on("reconnect", () => {
            console.log("서버와 재연결되었습니다.");
            newSocket.emit("joinRoom", { roomId, userId });
        });

        // 참여자 목록 업데이트 이벤트
        newSocket.on("participantsList", (updatedParticipants) => {
            console.log("participantsList 이벤트 수신:", updatedParticipants);
            setParticipants(updatedParticipants);
        });

        // 토론 종료 이벤트 추가
        newSocket.on("discussionEnded", (data) => {
            alert(data.message);
            navigate("/");
        });

        // joinRoomSuccess 이벤트 리스너 추가
        newSocket.on("joinRoomSuccess", (data) => {
            console.log("joinRoomSuccess 이벤트 수신:", data);
            setIsJoined(true);
            setIsHost(data.isHost);
            setParticipants(data.participants);
            console.log("참여자 목록 업데이트:", data.participants);

            const formattedHistory = data.chatHistory.map((msg) => ({
                userId: msg.userId,
                nickName: msg.nickName,
                msg: msg.msg,
                chatTime: new Date(msg.chatTime),
            }));
            setMessages(formattedHistory);
        });

        // 컴포넌트 언마운트 시 정리
        return () => {
            if (newSocket.connected) {
                newSocket.emit("leaveRoom", { roomId, userId });
            }
            newSocket.disconnect();
            setIsJoined(false);
        };
    }, [roomId, userId]);

    // 메시지 자동 스크롤
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 메시지 전송
    const sendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && socket && isJoined) {
            console.log("메시지 전송 시도:", {
                roomId,
                userId,
                msg: inputMessage,
            });

            socket.emit("chat", {
                roomId,
                userId,
                msg: inputMessage,
            });
            setInputMessage("");
        }
    };

    // 토론 종료 함수 추가
    const handleEndDiscussion = () => {
        if (window.confirm("정말로 토론을 종료하시겠습니까?")) {
            socket.emit("endDiscussion");
        }
    };

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <Container>
            <ChatContainer>
                <ParticipantsList>
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
                </ParticipantsList>

                <ChatSection>
                    <ChatBox>
                        {messages.map((message, index) => {
                            const isSystem = message.nickName === "System";

                            return (
                                <MessageBubble
                                    key={index}
                                    isMine={message.userId === userId}
                                    isSystem={isSystem}
                                >
                                    {!isSystem && (
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
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder={
                                isJoined
                                    ? "메시지를 입력하세요..."
                                    : "채팅방 참여 중..."
                            }
                            disabled={!isJoined}
                        />
                        <SendButton type='submit' disabled={!isJoined}>
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
    padding: 20px;
`;

const ChatContainer = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
`;

const ChatSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const ParticipantsList = styled.div`
    width: 200px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    height: fit-content;
    max-height: 500px;
    overflow-y: auto;
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
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    overflow-y: auto;
    background: #f9f9f9;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`;

const MessageBubble = styled.div`
    max-width: 70%;
    margin: 10px 0;
    padding: 10px 15px;
    border-radius: 15px;
    background: ${(props) => {
        if (props.isSystem) return "#f0f0f0";
        return props.isMine ? "#007bff" : "#e9ecef";
    }};
    color: ${(props) => {
        if (props.isSystem) return "#666";
        return props.isMine ? "white" : "black";
    }};
    align-self: ${(props) => {
        if (props.isSystem) return "center";
        return props.isMine ? "flex-end" : "flex-start";
    }};
    margin-left: ${(props) => (props.isMine ? "auto" : "0")};
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
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background: ${(props) => (props.disabled ? "#cccccc" : "#007bff")};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    &:hover {
        background: ${(props) => (props.disabled ? "#cccccc" : "#0056b3")};
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    padding: 20px;
    font-size: 16px;
`;

const EndDiscussionButton = styled.button`
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    margin-left: auto;

    &:hover {
        background-color: #c82333;
    }
`;
