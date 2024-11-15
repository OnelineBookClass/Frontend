import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/axiosConfig";
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
            ISBN: "9791168766006",
            title: "진격의 거인 5",
            author: "이사야마 하지메",
            thumbnail:
                "https://shopping-phinf.pstatic.net/main_4480340/44803409644.20231222155044.jpg",
        },
        // ... other books
    ],
    recentRooms: [
        {
            roomId: 1,
            roomTitle: "소년이 온다",
            thumbnail:
                "https://shopping-phinf.pstatic.net/main_3249140/32491401626.20231004072435.jpg",
            author: "한강",
            intro: "한강의 대표작, 1980년 5월 광주를 다룬 소설",
        },
        // ... other rooms
    ],
    recommendedBooks: [
        {
            ISBN: "9791168766006",
            title: "진격의 거인 5",
            author: "이사야마 하지메",
            thumbnail:
                "https://shopping-phinf.pstatic.net/main_4480340/44803409644.20231222155044.jpg",
        },
        // ... other recommended books
    ],
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

    useEffect(() => {
        const fetchMainData = async () => {
            try {
                const response = await axiosInstance.get("/mongdangbul/home");
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
                            recommended={mainData.recommendedBooks}
                        />
                    </>
                )}
            </MainContent>
        </Container>
    );
}

export default MainPage;
