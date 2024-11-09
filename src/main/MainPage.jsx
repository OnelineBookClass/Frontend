import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/axiosConfig";
import SearchBar from "../booksearch/component/SearchBar";
import PopularBooks from "./component/PopularBooks";
import RecentRooms from "./component/RecentRooms";
import Recommendations from "./component/Recommendations";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    padding: 20px;
    max-width: 768px;
    margin: 0 auto;

    margin-bottom: 40px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const Button = styled.button`
    width: 100%;
    height: 30px;
    background-color: #000;
    color: #fff;
`;

// 임시 데이터
const mockData = {
    popularBooks: [
        {
            bookId: 1,
            title: "인기 도서 제목 1",
            author: "저자 이름 1",
            thumbnail: "https://via.placeholder.com/150",
            rating: 4.5,
        },
        {
            bookId: 2,
            title: "인기 도서 제목 2",
            author: "저자 이름 2",
            thumbnail: "https://via.placeholder.com/150",
            rating: 4.3,
        },
    ],
    recentRooms: [
        {
            roomId: 101,
            roomTitle: "최근 토론방 제목 1",
            thumbnail: "https://via.placeholder.com/150",
            author: "방장 이름 1",
        },
        {
            roomId: 102,
            roomTitle: "최근 토론방 제목 2",
            thumbnail: "https://via.placeholder.com/150",
            author: "방장 이름 2",
        },
    ],
    recommendedItems: {
        books: [
            {
                bookId: 3,
                title: "추천 도서 제목 1",
                author: "저자 이름 3",
                thumbnail: "https://via.placeholder.com/150",
                rating: 4.6,
            },
        ],
        rooms: [
            {
                roomId: 103,
                roomTitle: "추천 토론방 제목 1",
                thumbnail: "https://via.placeholder.com/150",
                author: "방장 이름 3",
                peopleCount: 1,
            },
        ],
    },
};

function MainPage() {
    const [mainData, setMainData] = useState(mockData); // 초기값으로 목업 데이터 설정
    const navigate = useNavigate();

    const handleButtonClick = (buttonType) => {
        if (buttonType === "bookSearch") {
            navigate("/booksearch");
        } else if (buttonType === "discussionSearch") {
            navigate("/recent");
        }
    };

    // useEffect(() => {
    //     const fetchMainData = async () => {
    //         try {
    //             const response = await axiosInstance.get("/mongdangbul/home");
    //             setMainData(response.data);
    //         } catch (error) {
    //             console.error("메인 데이터 로딩 실패:", error);
    //         }
    //     };
    //     fetchMainData();
    // }, []);

    return (
        <Container>
            <MainContent>
                <ButtonContainer>
                    <Button onClick={() => handleButtonClick("bookSearch")}>
                        책 검색하기
                    </Button>
                    <Button
                        onClick={() => handleButtonClick("discussionSearch")}
                    >
                        방 검색하기
                    </Button>
                </ButtonContainer>
                {mainData && (
                    <>
                        <PopularBooks books={mainData.popularBooks} />
                        <RecentRooms rooms={mainData.recentRooms} />
                        <Recommendations
                            recommended={mainData.recommendedItems}
                        />
                    </>
                )}
            </MainContent>
        </Container>
    );
}

export default MainPage;
