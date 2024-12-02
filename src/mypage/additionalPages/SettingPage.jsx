import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { useLocation } from "react-router-dom";
import Title from "../../asset/component/Title";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const ImagePreview = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    object-fit: cover;
    margin-bottom: 15px;
    border: 3px solid #f6934c;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FileUploadLabel = styled.label`
    display: inline-block;
    padding: 8px 16px;
    background-color: #343e60;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover {
        background-color: #1a293f;
    }
`;

const InputGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin: 15px 0;
    flex-wrap: wrap;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
`;

const InputLabel = styled.span`
    font-size: 16px;
    font-weight: 500;
    min-width: 70px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px 15px;
    border: 2px solid #eee;
    border-radius: 10px;
    font-size: 16px;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #f6934c;
        outline: none;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 30px;
    width: 100%;
    max-width: 400px;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Button = styled.button`
    flex: 1;
    padding: 12px 20px;
    background-color: ${(props) => props.color || "#F6934C"};
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    max-width: 180px;

    &:hover {
        background-color: ${(props) => props.hoverColor || "#F9B754"};
        transform: translateY(-2px);
    }
`;

const WithdrawButton = styled(Button)`
    margin-top: 50px;
    background-color: #dc3545;
    width: 100%;
    max-width: 200px;

    &:hover {
        background-color: #c82333;
    }
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
                navigate("/");
            } catch (error) {
                console.error("회원 탈퇴 중 오류 발생:", error);
                alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div style={{ padding: "0 10px" }}>
            <Title>프로필 수정</Title>
            <Container>
                <ImageUploadContainer>
                    {(imagePreview || initialUserImage) && (
                        <ImagePreview
                            src={imagePreview || initialUserImage}
                            alt='프로필'
                        />
                    )}
                    <FileUploadLabel>
                        프로필 사진 변경
                        <HiddenFileInput
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                    </FileUploadLabel>
                </ImageUploadContainer>

                <InputGroup>
                    <InputLabel>닉네임 : </InputLabel>
                    <Input
                        type='text'
                        placeholder='새로운 닉네임을 입력하세요'
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                    />
                </InputGroup>

                <ButtonGroup>
                    <Button onClick={handleModify}>수정하기</Button>
                    <Button
                        color='#343E60'
                        hoverColor='#1A293F'
                        onClick={() => navigate("/mypage")}
                    >
                        취소
                    </Button>
                </ButtonGroup>

                <WithdrawButton onClick={handleWithdraw}>
                    회원 탈퇴
                </WithdrawButton>
            </Container>
        </div>
    );
}

export default SettingPage;
