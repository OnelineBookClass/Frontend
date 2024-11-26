import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Container = styled.div`
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    overflow: hidden;
    height: ${(props) => (props.isSearchMode ? "60px" : "65px")};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Button = styled.button`
    width: 120px;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 1.2rem;
    background-color: ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};
    color: ${({ isDark }) => (isDark ? "#0d142d" : "#ffffff")};
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: ${(props) => (props.isSearchMode ? "0" : "1")};
    transform: translateY(${(props) => (props.isSearchMode ? "-50px" : "0")});
    white-space: nowrap;
`;

const SearchContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    opacity: ${(props) => (props.isSearchMode ? "1" : "0")};
    transform: translateY(${(props) => (props.isSearchMode ? "-45px" : "0")});
    transition: all 0.3s ease;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.8rem;
    font-size: 1rem;
    border: 2px solid ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};
    border-radius: 0.5rem;
    outline: none;

    &::placeholder {
        color: #999;
    }
`;

const SearchButton = styled.button`
    padding: 0.5rem 1.2rem;
    background-color: ${({ isDark }) => (isDark ? "#ffffff" : "#0d142d")};
    color: ${({ isDark }) => (isDark ? "#0d142d" : "#ffffff")};
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

function CreateRoomButton() {
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleButtonClick = () => {
        setIsSearchMode(true);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/booksearch?query=${searchTerm}&from=createGroup`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Container isSearchMode={isSearchMode}>
            <Button
                onClick={handleButtonClick}
                isSearchMode={isSearchMode}
                isDark={isDark}
            >
                모임 만들기
            </Button>
            <SearchContainer isSearchMode={isSearchMode} isDark={isDark}>
                <SearchInput
                    placeholder='모임을 만들 책을 검색해보세요!'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <SearchButton onClick={handleSearch} isDark={isDark}>
                    <FaSearch size={23} />
                </SearchButton>
            </SearchContainer>
        </Container>
    );
}

export default CreateRoomButton;
