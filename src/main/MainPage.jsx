import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/axiosConfig";
import PopularBooks from "./component/PopularBooks";
import RecentRooms from "./component/RecentRooms";
import Recommendations from "./component/Recommendations";
import Header from "./component/Header";

const Container = styled.div`
    margin: 0px auto;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

function MainPage() {
    const [mainData, setMainData] = useState();

    useEffect(() => {
        const fetchMainData = async () => {
            try {
                const response = await axiosInstance.get("/mongdangbul/home", {
                    params: {
                        userId: localStorage.getItem("userId"),
                    },
                });
                console.log(response.data);
                setMainData(response.data);
            } catch (error) {
                console.error("메인 데이터 로딩 실패:", error);
            }
        };
        fetchMainData();
    }, []);

    return (
        <Container>
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
