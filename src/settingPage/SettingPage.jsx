import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField, Input } from "@mui/material";
import axiosInstance from "../utils/axiosConfig";
import { useLocation } from "react-router-dom";

function SettingsPage() {
    const location = useLocation();
    const userId = location.state?.userId;

    const mockData = {
        "myInfo": {
            "userImage": "https://via.placeholder.com/150",
            "rating": 4.5,
            "nickName": "nick"
        }
    };

    const [userInfo, setUserInfo] = useState(mockData.myInfo);
    const [imageFile, setImageFile] = useState(null);  

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId) {
                    const response = await axiosInstance.get(`/mongdangbul/user/${userId}`);
                    setUserInfo(response.data.myInfo);
                    setImageFile(response.data.myInfo.userImage); 
                }
            } catch (error) {
                console.error("유저 정보 로딩 실패: " + error);
            }
        };

        fetchUserData(); 
    }, [userId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);  
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("nickName", userInfo.nickName);
        if (imageFile) {
            formData.append("userImage", imageFile);  
        }

        try {
            const response = await axiosInstance.put("/mongdangbul/user/modify", formData);
            if (response.status === 200) {
                alert("정보 수정 성공");
            } else {
                alert("정보 수정 실패");
            }
        } catch (error) {
            console.error("업데이트 실패:", error);
            alert("업데이트 실패: " + (error.response?.data?.message || "서버 오류"));
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, maxWidth: 600, margin: '0 auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
                정보 수정
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <input type="text" value={userId} readOnly style={{ display: 'none' }} />

                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            이미지 첨부
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #ccc', borderRadius: 1, width: 150, height: 150, overflow: 'hidden' }}>
                            {imageFile && typeof imageFile === 'string' ? (
                                <img src={imageFile} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : imageFile instanceof File ? (
                                <img src={URL.createObjectURL(imageFile)} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <img src={mockData.myInfo.userImage} alt="기본 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                            닉네임
                        </Typography>
                        <TextField
                            fullWidth
                            value={userInfo.nickName}
                            onChange={(e) => setUserInfo({ ...userInfo, nickName: e.target.value })}
                            placeholder="닉네임"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: 2 }}>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        sx={{ marginBottom: 2 }}
                    />
                </Box>

                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', padding: '1rem'}}>
                    정보 수정
                </Button>
            </form>
        </Box>
    );
}

export default SettingsPage;
