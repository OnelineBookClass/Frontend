import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${(props) => props.color || "#fee500"};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.hoverColor || "#e6cf00"};
    }
`;

const WithdrawButton = styled(Button)`
    margin-top: 50px;
    background-color: #ff4444;
    color: white;

    &:hover {
        background-color: #cc0000;
    }
`;

const ImagePreview = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    object-fit: cover;
    margin: 20px 0;
`;

function SettingPage() {
    const userId = localStorage.getItem("userId");
    const location = useLocation();
    const { nickName: initialNickName, userImage: initialUserImage } =
        location.state || {};

    const profileImageSrc = initialUserImage
        ? `data:image/jpeg;base64,${initialUserImage}`
        : "";

    const [nickName, setNickName] = useState(initialNickName || "");
    const [userImage, setUserImage] = useState(initialUserImage || null);
    const [imagePreview, setImagePreview] = useState(profileImageSrc || null);
    const navigate = useNavigate();

    const compressImage = (file, maxSizeKB) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;
                    let quality = 0.5;
                    let iterations = 0;

                    const compress = () => {
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        canvas.toBlob(
                            (blob) => {
                                if (
                                    blob.size > maxSizeKB * 1024 &&
                                    iterations < 10
                                ) {
                                    iterations++;
                                    width *= 0.9;
                                    height *= 0.9;
                                    quality -= 0.05;
                                    compress();
                                } else {
                                    resolve(blob);
                                }
                            },
                            "image/jpeg",
                            quality
                        );
                    };

                    compress();
                };
            };
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // 이미지 압축 크기를 100KB로 줄임
                const compressedBlob = await compressImage(file, 100);

                // 압축된 이미지를 base64로 변환
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    const base64Data = reader.result;
                    setUserImage(base64Data);
                    setImagePreview(base64String);
                };
                reader.readAsDataURL(compressedBlob);
            } catch (error) {
                console.error("이미지 압축 중 오류 발생:", error);
                alert("이미지 처리 중 오류가 발생했습니다.");
            }
        }
    };

    const handleModify = async () => {
        try {
            console.log(userImage);
            await axiosInstance.put("/mongdangbul/user/modify", {
                userId,
                userImage,
                nickName,
            });
            alert("프로필이 성공적으로 수정되었습니다.");
            navigate("/mypage");
        } catch (error) {
            console.error("프로필 수정 중 오류 발생:", error);
            alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleWithdraw = async () => {
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            try {
                await axiosInstance.delete("/mongdangbul/user/withdraw", {
                    data: { userId },
                });
                localStorage.removeItem("userId");
                alert("회원 탈퇴가 완료되었습니다.");
                navigate("/login");
            } catch (error) {
                console.error("회원 탈퇴 중 오류 발생:", error);
                alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <Container>
            <h2>프로필 수정</h2>
            {(imagePreview || initialUserImage) && (
                <ImagePreview
                    src={imagePreview || initialUserImage}
                    alt='use'
                />
            )}
            <Input type='file' accept='image/*' onChange={handleImageChange} />
            <Input
                type='text'
                placeholder='새로운 닉네임을 입력하세요'
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
            />
            <ButtonGroup>
                <Button onClick={handleModify}>수정하기</Button>
                <Button
                    color='#dddddd'
                    hoverColor='#bbbbbb'
                    onClick={() => navigate("/mypage")}
                >
                    취소
                </Button>
            </ButtonGroup>
            <WithdrawButton onClick={handleWithdraw}>회원 탈퇴</WithdrawButton>
        </Container>
    );
}

export default SettingPage;
