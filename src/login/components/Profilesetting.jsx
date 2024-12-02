import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { UserContext } from "../context/LoginContext";

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

const Title = styled.h2`
    color: #1a293f;
    margin-bottom: 30px;
    font-size: 24px;
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
    width: fit-content;
    text-align: center;

    &:hover {
        background-color: #1a293f;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
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

    @media (max-width: 480px) {
        width: 100%;
    }
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

    @media (max-width: 480px) {
        width: 100%;
    }
`;

const Button = styled.button`
    padding: 12px 20px;
    background-color: #f6934c;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-top: 30px;
    width: 100%;
    max-width: 200px;

    &:hover {
        background-color: #f9b754;
        transform: translateY(-2px);
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;

function Profilesetting() {
    const { userId } = useContext(UserContext);
    const [nickName, setNickName] = useState("");
    const [userImage, setUserImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setUserImage(base64String);
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            await axiosInstance.post("/mongdangbul/user/register", {
                userId,
                nickName,
                userImage,
            });

            navigate("/main");
        } catch (error) {
            console.error("프로필 설정 중 오류 발생:", error);
            alert("프로필 설정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Container>
            <Title>프로필 설정</Title>
            <ImageUploadContainer>
                {imagePreview && (
                    <ImagePreview src={imagePreview} alt='프로필 미리보기' />
                )}
                <FileUploadLabel>
                    프로필 사진 선택
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
                    placeholder='닉네임을 입력하세요'
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                />
            </InputGroup>

            <Button onClick={handleSubmit}>확인</Button>
        </Container>
    );
}

export default Profilesetting;
