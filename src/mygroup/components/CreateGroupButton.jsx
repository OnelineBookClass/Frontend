import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; visibility: hidden; }
`;

const slideIn = keyframes`
  from { width: 0; opacity: 0; }
  to { width: 100%; opacity: 1; }
`;

const StyledButton = styled.button`
    width: clamp(220px, 25vw, 280px);
    height: clamp(300px, 40vh, 600px);
    border: 2px dashed #ccc;
    border-radius: 15px;
    background: none;
    color: #666;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s ease;
    margin: 0 auto;
    animation: ${(props) => (props.isSearching ? fadeOut : "none")} 0.3s
        forwards;

    &:hover {
        background: #f5f5f5;
        border-color: #999;
    }

    &::before {
        content: "+";
        font-size: clamp(1.5rem, 2vw, 2rem);
        margin-bottom: 10px;
    }
`;

const SearchContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) =>
        props.isSearching ? "clamp(300px, 50vw, 600px)" : "0"};
    height: ${(props) => (props.isSearching ? "auto" : "0")};
    opacity: ${(props) => (props.isSearching ? "1" : "0")};
    visibility: ${(props) => (props.isSearching ? "visible" : "hidden")};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: clamp(10px, 1.5vw, 12px) clamp(12px, 2vw, 20px);
    border: 2px solid ${(props) => (props.isDark ? "#ffffff" : "#0d142d")};
    border-radius: 20px;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
    outline: none;
    animation: ${slideIn} 0.3s ease forwards;
`;

const SearchButton = styled.button`
    background: none;
    border: none;
    color: ${(props) => (props.isDark ? "#ffffff" : "#0d142d")};
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CreateGroupButton = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const handleInitialClick = () => {
        setIsSearching(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/booksearch?query=${searchTerm}&from=createGroup`);
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <StyledButton
                onClick={handleInitialClick}
                isSearching={isSearching}
            >
                모임 열기
            </StyledButton>

            {isSearching && (
                <SearchContainer isSearching={isSearching}>
                    <form
                        onSubmit={handleSearch}
                        style={{ width: "100%", display: "flex", gap: "10px" }}
                    >
                        <SearchInput
                            placeholder='모임할 책을 검색해보세요'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                            isDark={isDark}
                        />
                        <SearchButton type='submit' isDark={isDark}>
                            <FaSearch />
                        </SearchButton>
                    </form>
                </SearchContainer>
            )}
        </div>
    );
};

export default CreateGroupButton;
