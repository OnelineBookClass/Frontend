import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../utils/axiosConfig";
import PopularBooks from "./component/PopularBooks";
import RecentRooms from "./component/RecentRooms";
import Recommendations from "./component/Recommendations";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import banner from "../asset/image/모닥불.jpg";
import { useTheme } from "../context/ThemeContext";

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
    color: #ffffff;
    font-weight: 500;
    font-size: 2.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Description = styled.div`
    position: absolute;
    top: 170px;
    right: 10px;
    color: #ffffff;
    font-size: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
    margin: 0 auto;
    margin-bottom: 40px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
    width: 100%;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    width: ${(props) => (props.isOpen ? "calc(100% - 60px)" : "0")};
    transition: width 0.5s ease-in-out;

    form {
        width: 100%;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 20px;
    background-color: ${({ isDark }) =>
        isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(13, 20, 45, 0.1)"};
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    color: ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};

    &::placeholder {
        color: ${({ isDark }) =>
            isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(13, 20, 45, 0.7)"};
    }

    &:focus {
        background-color: ${({ isDark }) =>
            isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(13, 20, 45, 0.15)"};
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
`;

const GlowingIcon = styled(FaSearch)`
    font-size: clamp(1.4rem, 10vw, 2.5rem);
    color: ${({ isDark }) => (isDark ? "#e8f1f2" : "#0d142d")};
    filter: ${({ isDark }) =>
        isDark
            ? "drop-shadow(0 0 5px rgba(232, 241, 242, 0.7)) drop-shadow(0 0 10px rgba(176, 196, 222, 0.5)) drop-shadow(0 0 15px rgba(135, 206, 235, 0.3))"
            : "drop-shadow(0 0 5px rgba(13, 20, 45, 0.7)) drop-shadow(0 0 10px rgba(13, 20, 45, 0.5)) drop-shadow(0 0 15px rgba(13, 20, 45, 0.3))"};
    animation: ${({ isDark }) => (isDark ? "moonGlow" : "sunGlow")} 3s
        ease-in-out infinite;

    @keyframes moonGlow {
        0% {
            color: #e8f1f2;
            filter: drop-shadow(0 0 5px rgba(232, 241, 242, 0.7))
                drop-shadow(0 0 10px rgba(176, 196, 222, 0.5))
                drop-shadow(0 0 15px rgba(135, 206, 235, 0.3));
        }
        50% {
            color: #f8f9fa;
            filter: drop-shadow(0 0 7px rgba(232, 241, 242, 0.8))
                drop-shadow(0 0 12px rgba(176, 196, 222, 0.6))
                drop-shadow(0 0 17px rgba(135, 206, 235, 0.4));
        }
        100% {
            color: #e8f1f2;
            filter: drop-shadow(0 0 5px rgba(232, 241, 242, 0.7))
                drop-shadow(0 0 10px rgba(176, 196, 222, 0.5))
                drop-shadow(0 0 15px rgba(135, 206, 235, 0.3));
        }
    }

    @keyframes sunGlow {
        0% {
            color: #0d142d;
            filter: drop-shadow(0 0 5px rgba(13, 20, 45, 0.7))
                drop-shadow(0 0 10px rgba(13, 20, 45, 0.5))
                drop-shadow(0 0 15px rgba(13, 20, 45, 0.3));
        }
        50% {
            color: #1a237e;
            filter: drop-shadow(0 0 7px rgba(13, 20, 45, 0.8))
                drop-shadow(0 0 12px rgba(13, 20, 45, 0.6))
                drop-shadow(0 0 17px rgba(13, 20, 45, 0.4));
        }
        100% {
            color: #0d142d;
            filter: drop-shadow(0 0 5px rgba(13, 20, 45, 0.7))
                drop-shadow(0 0 10px rgba(13, 20, 45, 0.5))
                drop-shadow(0 0 15px rgba(13, 20, 45, 0.3));
        }
    }
`;

function MainPage() {
    const { isDark } = useTheme();
    const [mainData, setMainData] = useState();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleIconClick = () => {
        if (!isSearchOpen) {
            setIsSearchOpen(true);
            setTimeout(() => {
                document.querySelector("#searchInput")?.focus();
            }, 300);
        } else if (searchTerm.trim()) {
            navigate(`/booksearch?query=${searchTerm}`);
        } else {
            setIsSearchOpen(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/booksearch?query=${searchTerm}&from=main`);
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
                <Description>온라인 독서 모임 플랫폼</Description>
            </BannerContainer>
            <MainContent>
                <SearchContainer>
                    <SearchInputContainer isOpen={isSearchOpen}>
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                id='searchInput'
                                placeholder='책 제목을 검색해보세요'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                isDark={isDark}
                            />
                        </form>
                    </SearchInputContainer>
                    <Button onClick={handleIconClick} isOpen={isSearchOpen}>
                        <GlowingIcon isDark={isDark} />
                    </Button>
                </SearchContainer>
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
