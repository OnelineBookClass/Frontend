import React from "react";
import { Typography, Box } from "@mui/material";
import { ProfileContainer, FixedAvatar } from "./style/UserInfoStyle";
import styled from "styled-components";

const CenteredProfileContainer = styled(ProfileContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

function UserInfo({ myInfo }) {
    // 유저 정보 불러오는 api 삽입 예정

    const profileImageSrc = myInfo?.userImage
        ? `data:image/jpeg;base64,${myInfo.userImage}`
        : "";

    return (
        <CenteredProfileContainer>
            {/* 사진 부분 */}
            <FixedAvatar
                src={profileImageSrc}
                alt={myInfo && myInfo.nickName}
                sx={{ width: 80, height: 80 }}
            ></FixedAvatar>

            <Box sx={{ textAlign: "center", mt: 2 }}>
                {/* 이름 */}
                <Typography variant='h6' component='div'>
                    {myInfo && myInfo.nickName}
                </Typography>

                {/* 방장 평점 */}
                <Typography variant='body2' sx={{ color: "gray", mt: 1 }}>
                    방장 평점 : {myInfo && myInfo.rating}
                </Typography>
            </Box>
        </CenteredProfileContainer>
    );
}

export default UserInfo;
