import React, { useState } from "react";
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

function SearchBar({ onSearch }) {
    const [searchType, setSearchType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (!searchQuery) return;

        // 더미 데이터 검색
        const results = dummyBooks.filter((book) => {
            if (searchType === "title") {
                return book.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            } else {
                return book.author
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }
        });

        onSearch(results);

        // API 호출 부분 (주석처리)
        /*
        axiosInstance.get(
            `/mongdangbul/books/search?query=${searchQuery}&type=${searchType}`
        ).then(response => {
            onSearch(response.data);
        });
        */
    };

    return (
        <SearchContainer>
            <SearchWrapper>
                <SearchSelect
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value='all'>제목 또는 저자</option>
                    <option value='title'>제목</option>
                    <option value='author'>저자</option>
                </SearchSelect>
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                        searchType === "all"
                            ? "검색어를 입력하세요"
                            : searchType === "title"
                            ? "책 이름을 입력하세요"
                            : "저자 이름을 입력하세요"
                    }
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                />
                <SearchButton onClick={handleSearch}>
                    <FaSearch />
                </SearchButton>
            </SearchWrapper>
        </SearchContainer>
    );
}

export default SearchBar;
