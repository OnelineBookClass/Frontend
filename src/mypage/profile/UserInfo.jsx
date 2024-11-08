import React from "react";

import { Typography } from "@mui/material";
import { ProfileContainer, InnerContainer, FixedAvatar } from "./style/UserInfoStyle";

function UserInfo() {

    const username = "박태우";
    return (

        <ProfileContainer>
            <FixedAvatar>박</FixedAvatar>
            <InnerContainer>
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>{username}</Typography>
                <Typography sx={{color : "gray"}}>토론 기록</Typography>
            </InnerContainer>
        </ProfileContainer>


    );


}

export default UserInfo;