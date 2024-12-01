import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import LogoText from "../../asset/component/LogoText";

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100px;
    gap: 20px;
    margin-bottom: 1rem;
    padding: 0 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
`;

const HeaderWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
    position: relative;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    width: ${(props) => (props.isOpen ? "calc(100% - 40px)" : "0")};
    transition: width 0.3s ease-in-out;
    position: absolute;
    right: 40px;

    form {
        width: 100%;
        display: flex;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 20px;
    background-color: #6b738e;
    outline: none;
    font-size: 1rem;
    color: white;

    &::placeholder {
        color: white;
    }
`;

const SearchButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
`;

function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        if (!isSearchOpen) {
            setIsSearchOpen(true);
            setTimeout(() => {
                document.querySelector("#headerSearchInput")?.focus();
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
            navigate(`/booksearch?query=${searchTerm}`);
        }
    };

    return (
        <HeaderContainer isDark={isDark}>
            <HeaderWrapper>
                <LogoText>몽당불</LogoText>
                <SearchContainer>
                    <SearchInputContainer isOpen={isSearchOpen}>
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                id='headerSearchInput'
                                placeholder='책 제목을 검색해보세요'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </SearchInputContainer>
                    <SearchButton onClick={handleSearchClick}>
                        <FaSearch
                            size='clamp(20px, 2vw, 25px)'
                            color={isDark ? "white" : "#1A293F"}
                        />
                    </SearchButton>
                </SearchContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
}

export default Header;
