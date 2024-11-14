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

    return (
        <CenteredProfileContainer>
            {/* 사진 부분 */}
            <FixedAvatar
                src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxOTA1MDNfMTk1%2FMDAxNTU2ODkzOTI5MzEw.o1b1EHB8_XHS3rrRqHhlDILWRfLXVZx2EODb9_KFYUwg.OomY6nnEUwFSd6ywFWoadsl22AiW1HRCGEcxjVZdcbog.JPEG.haa6613%2FexternalFile.jpg&type=a340"
                alt={myInfo.nickName}
                sx={{ width: 80, height: 80 }}></FixedAvatar>

            <Box sx={{ textAlign: "center", mt: 2 }}>
                {/* 이름 */}
                <Typography variant="h6" component="div">
                    {myInfo.nickName}
                </Typography>

                {/* 방장 평점 */}
                <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
                    방장 평점 : {myInfo.rating}
                </Typography>
            </Box>
        </CenteredProfileContainer>
    );
}

export default UserInfo;
