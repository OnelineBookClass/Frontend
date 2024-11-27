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
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #fee500;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #e6cf00;
    }
`;

const ImagePreview = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 75px;
    object-fit: cover;
    margin: 20px 0;
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
            <h2>프로필 설정</h2>
            {imagePreview && (
                <ImagePreview src={imagePreview} alt='프로필 미리보기' />
            )}
            <Input type='file' accept='image/*' onChange={handleImageChange} />
            <Input
                type='text'
                placeholder='닉네임을 입력하세요'
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
            />
            <Button onClick={handleSubmit}>확인</Button>
        </Container>
    );
}

export default Profilesetting;
