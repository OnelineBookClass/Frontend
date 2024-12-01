import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/axiosConfig";
import PopularBooks from "./component/PopularBooks";
import RecentRooms from "./component/RecentRooms";
import Recommendations from "./component/Recommendations";
import Header from "./component/Header";
import LoadingOverlay from "../components/LoadingOverlay";

const Container = styled.div`
    margin: 0px auto;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

const dummyData = {
    popularBooks: [
        {
            bookId: 1,
            title: "책 제목",
            author: "저자",
            imageUrl: "이미지 URL",
        },
    ],
    recentRooms: [
        {
            roomId: 1,
            title: "방 제목",
            imageUrl: "이미지 URL",
        },
    ],
    recommendedBooks: [
        {
            bookId: 1,
            title: "책 제목",
            author: "저자",
            imageUrl: "이미지 URL",
        },
    ],
};

function MainPage() {
    const [mainData, setMainData] = useState(dummyData);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchMainData = async () => {
            setLoading(true);
            try {
                // 1. 먼저 추천 갱신
                await axiosInstance.get(`/mongdangbul/recommend/${userId}`);

                // 2. 그 다음 메인페이지 데이터 로드
                const response = await axiosInstance.get("/mongdangbul/home", {
                    params: {
                        userId: userId,
                    },
                });
                setMainData(response.data);
            } catch (error) {
                console.error("메인 데이터 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMainData();
    }, [userId]);

    return (
        <Container>
            {loading && <LoadingOverlay />}
            <MainContent>
                <Header />
                {mainData && (
                    <>
                        <PopularBooks books={mainData.popularBooks} />
                        <RecentRooms rooms={mainData.recentRooms} />
                        <Recommendations
                            recommended={mainData.recommendedBooks}
                        />
                    </>
                )}
            </MainContent>
        </Container>
    );
}

export default MainPage;
