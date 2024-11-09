import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
    margin: 10px 5px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

function SearchBar() {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate("/search");
    };

    return (
        <SearchContainer onClick={handleSearchClick}>
            <SearchInput placeholder='책을 검색해보세요' />
        </SearchContainer>
    );
}

export default SearchBar;
