import { UserContext } from "../login/context/LoginContext";
import { useState } from "react";
import Footer from "../footer/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

import ChattingRoom from "../chattingroom/Chattingroom";

import MainPage from "../main/MainPage";
import LoginPage from "../login/LoginPage";
import Kakao from "../login/callback/Kakao";
import MyPage from "../mypage/MyPage";
import RecentDiscussions from "../recentDiscussions/RecentDiscussions";
import BookSearchPage from "../booksearch/BookSearchPage";
import BookInfo from "../bookinfo/BookInfo";
import MyGroupPage from "../mygroup/MyGroupPage";
import Profilesetting from "../login/components/Profilesetting";
import CreateRoom from "../createRoom/CreateRoom";
import SettingPage from "../mypage/additionalPages/SettingPage";
import DesiredBooksPage from "../mypage/additionalPages/DesiredBooksPage";
import MyDiscussionRecordPage from "../mypage/additionalPages/MyDiscussionRecordPage";
import RoomDetailPage from "../roomdetail/RoomDetailPage";
function AppContent() {
    const location = useLocation();
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loginType, setLoginType] = useState("");
    const [userId, setUserId] = useState("1234");

    const shouldShowHeaderFooter =
        ![
            "/",
            "/auth/callback/kakao",
            "/profilesetting",
            "/chattingroom/:roomId/:userId",
        ].includes(location.pathname) &&
        !location.pathname.startsWith("/chattingroom/");

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
                <Route path='/main' element={<MainPage />} />

                <Route path='/' element={<LoginPage />} />
                <Route path='/auth/callback/kakao' element={<Kakao />} />

                <Route path='/mypage' element={<MyPage />} />
                <Route path='/recent' element={<RecentDiscussions />} />
                <Route path='/bookSearch' element={<BookSearchPage />} />
                <Route path='/book/:isbn' element={<BookInfo />} />
                <Route path='/mygroup' element={<MyGroupPage />} />
                <Route path='/profilesetting' element={<Profilesetting />} />
                <Route path='/create-group' element={<CreateRoom />} />
                <Route path='/settings' element={<SettingPage />} />
                <Route path='/desired' element={<DesiredBooksPage />} />
                <Route
                    path='/mydiscussion'
                    element={<MyDiscussionRecordPage />}
                />
                <Route
                    path='/roomdetail/:roomId'
                    element={<RoomDetailPage />}
                />
                <Route
                    path='/chattingroom/:roomId/:userId'
                    element={<ChattingRoom />}
                />
            </Routes>
            {shouldShowHeaderFooter && <Footer />}
        </UserContext.Provider>
    );
}

export default AppContent;
