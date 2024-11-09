import { UserContext } from "../login/context/LoginContext";
import { useState } from "react";
import Footer from "../footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

import MainPage from "../main/MainPage";
import LoginPage from "../login/LoginPage";
import Kakao from "../login/callback/Kakao";
import MyPage from "../mypage/MyPage";
import RecommendedDiscussionsAndBooks from "../recommendedDiscussionsAndBooks/RecommendedDiscussionsAndBooks";
import RecentDiscussions from "../recentDiscussions/RecentDiscussions";

function AppContent() {
    const location = useLocation();
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loginType, setLoginType] = useState("");
    const [userId, setUserId] = useState("1234");

    const shouldShowHeaderFooter = ![
        "/login",
        "/auth/callback/kakao",
        "/profilesetting",
    ].includes(location.pathname);

    return (
        <UserContext.Provider
            value={{
                accessToken,
                setAccessToken: (token) => {
                    setAccessToken(token);
                    token
                        ? localStorage.setItem("accessToken", token)
                        : localStorage.removeItem("accessToken");
                },
                refreshToken,
                setRefreshToken: (token) => {
                    setRefreshToken(token);
                    token
                        ? localStorage.setItem("refreshToken", token)
                        : localStorage.removeItem("refreshToken");
                },
                loginType,
                setLoginType: (type) => {
                    setLoginType(type);
                    type
                        ? localStorage.setItem("loginType", type)
                        : localStorage.removeItem("loginType");
                },
                userId,
                setUserId: (id) => {
                    setUserId(id);
                    id
                        ? localStorage.setItem("userId", id)
                        : localStorage.removeItem("userId");
                },
            }}
        >
            <Routes>
                <Route path='/' element={<MainPage />} />

                <Route path='/login' element={<LoginPage />} />
                <Route path='/auth/callback/kakao' element={<Kakao />} />

                <Route path='/mypage' element={<MyPage />} />
                <Route
                    path='/recommended'
                    element={<RecommendedDiscussionsAndBooks />}
                />
                <Route path='/recent' element={<RecentDiscussions />} />
            </Routes>
            {shouldShowHeaderFooter && <Footer />}
        </UserContext.Provider>
    );
}

export default AppContent;
