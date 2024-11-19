import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/axiosConfig";
import PopularBooks from "./component/PopularBooks";
import RecentRooms from "./component/RecentRooms";
import Recommendations from "./component/Recommendations";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import banner from "../asset/image/모닥불.jpg";

const BannerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    margin-bottom: 40px;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const LogoText = styled.div`
    position: absolute;
    top: 10px;
    left: 20px;
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Description = styled.div`
    position: absolute;
    top: 170px;
    right: 10px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
    max-width: 768px;
    margin: 0 auto;
    margin-bottom: 40px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30%;
    background-color: #8e0202;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: clamp(1.4rem, 10vw, 2.5rem);
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
            <BannerContainer>
                <BannerImage
                    src={banner} // 배너 이미지 경로 지정 필요
                    alt='몽당불 배너'
                />
                <LogoText>몽당불</LogoText>
                <Description>
                    모임을 즐기는 사람들을 위한 책 추천 서비스
                </Description>
            </BannerContainer>
            <MainContent>
                <ButtonContainer>
                    <Button onClick={() => handleButtonClick("bookSearch")}>
                        <FaSearch />
                        <div style={{ marginLeft: "1rem" }}>책 검색하기</div>
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
