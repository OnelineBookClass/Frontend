import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../utils/axiosConfig";

const SearchContainer = styled.div`
    margin: 10px 5px;
`;

const SearchWrapper = styled.div`
    display: flex;
    gap: 5px;
`;

const SearchSelect = styled.select`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    min-width: 90px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const SearchButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #797979;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #8e0202;
    }
`;

// 더미 데이터
const dummyBooks = [
    {
        id: 1,
        title: "해리포터와 마법사의 돌",
        author: "J.K. 롤링",
        rating: 4.5,
        publisher: "문학수첩",
        imageUrl: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        title: "해리포터와 비밀의 방",
        author: "J.K. 롤링",
        rating: 4.6,
        publisher: "문학수첩",
        imageUrl: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        title: "어린왕자",
        author: "생텍쥐페리",
        rating: 4.8,
        publisher: "열린책들",
        imageUrl: "https://via.placeholder.com/150",
    },
    {
        id: 4,
        title: "데미안",
        author: "헤르만 헤세",
        rating: 4.7,
        publisher: "민음사",
        imageUrl: "https://via.placeholder.com/150",
    },
];

function SearchBar({ onSearch, currentPage, searchQuery: initialQuery }) {
    const [searchType, setSearchType] = useState("all");
    const [searchQuery, setSearchQuery] = useState(initialQuery || "");

    const handleSearch = async (page = 1) => {
        if (!searchQuery) return;

        try {
            const response = await axiosInstance.get(
                `/mongdangbul/books/searchNaver`,
                {
                    params: {
                        query: searchQuery,
                        page: page,
                        display: 6,
                    },
                }
            );

            console.log("검색 결과:", response.data);
            onSearch(response.data.bookList, response.data.meta, searchQuery);
        } catch (error) {
            console.error("검색 오류:", error);
        }
    };

    // currentPage가 변경될 때마다 검색 실행
    useEffect(() => {
        if (searchQuery) {
            handleSearch(currentPage);
        }
    }, [currentPage]);

    return (
        <SearchContainer>
            <SearchWrapper>
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='검색어를 입력하세요 !'
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSearch(1);
                    }}
                />
                <SearchButton onClick={() => handleSearch(1)}>
                    <FaSearch />
                </SearchButton>
            </SearchWrapper>
        </SearchContainer>
    );
}

export default SearchBar;
