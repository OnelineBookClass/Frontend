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

function UserInfo() {
    const username = "박태우";
    const rating = 4.5;

    return (
        <CenteredProfileContainer>
            {/* 사진 부분 */}
            <FixedAvatar sx={{ width: 80, height: 80 }}>박</FixedAvatar>

            <Box sx={{ textAlign: "center", mt: 2 }}>
                {/* 이름 */}
                <Typography variant="h6" component="div">
                    {username}
                </Typography>

                {/* 방장 평점 */}
                <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                    방장 평점 : {rating}
                </Typography>
            </Box>
        </CenteredProfileContainer>
    );
}

export default UserInfo;
