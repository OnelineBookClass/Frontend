import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const SearchContainer = styled.div`
    position: relative;
    margin-bottom: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 40px 12px 15px;
    border: 2px solid ${({ isDark }) => (isDark ? "#ff9933" : "#0d142d")};
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    background: transparent;
    color: ${({ isDark }) => (isDark ? "#ff9933" : "#0d142d")};

    &::placeholder {
        color: #999;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ isDark }) => (isDark ? "#ff9933" : "#0d142d")};
`;

function SearchInput({ value, onChange }) {
    const { isDark } = useTheme();

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <SearchContainer>
            <Input
                type='text'
                placeholder='모임 제목으로 검색하기'
                value={value}
                onChange={handleChange}
                isDark={isDark}
            />
            <SearchIcon isDark={isDark}>
                <FaSearch />
            </SearchIcon>
        </SearchContainer>
    );
}

export default SearchInput;
