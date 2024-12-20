import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/LoginContext";
import axiosInstance from "../../utils/axiosConfig";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

export default function Kakao() {
    const { setAccessToken, setRefreshToken, setLoginType, setUserId } =
        useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        try {
            const url = new URL(window.location.href);
            const code = url.searchParams.get("code");
            if (code) {
                axiosInstance
                    .post("/auth/kakao/accesstoken", {
                        code: code,
                    })
                    .then((result) => {
                        const accessToken = result.data.access_token;
                        const refreshToken = result.data.refresh_token;

                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);
                        setAccessToken(accessToken);
                        setRefreshToken(refreshToken);
                        setLoginType("KAKAO");

                        axios({
                            url: "https://kapi.kakao.com/v2/user/me",
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        })
                            .then((userResult) => {
                                console.log("user info from kakao", userResult);
                                const userId = userResult.data.id;
                                setUserId(userId);
                                console.log(userId);
                                axiosInstance
                                    .get(
                                        `/mongdangbul/user/checkUser/${userId}`
                                    )
                                    .then((response) => {
                                        if (response.data.isExist) {
                                            window.alert(
                                                `${response.data.nickName}님 환영합니다!`
                                            );
                                            navigate("/main");
                                        } else {
                                            navigate("/profilesetting");
                                        }
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return <Container>Kakao Login Loading...</Container>;
}
