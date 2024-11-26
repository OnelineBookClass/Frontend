import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import BookCard from "./component/BookCard";
import Pagination from "./component/Pagination";
import LoadingOverlay from "../components/LoadingOverlay";
import axiosInstance from "../utils/axiosConfig";
import Title from "../asset/component/Title";
const Container = styled.div`
    padding: 20px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 100px;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const ResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;

    @media (min-width: 620px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

function BookSearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const handleSearch = async (query, page = 1) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(
                "/mongdangbul/books/searchNaver",
                {
                    params: {
                        query: query,
                        page: page,
                        display: 6,
                    },
                }
            );

            setSearchResults(response.data.bookList);
            setTotalPages(response.data.meta.pageable_count);
            setSearchQuery(query);
            setCurrentPage(response.data.meta.current_page);
        } catch (error) {
            console.error("검색 오류:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        handleSearch(searchQuery, newPage);
    };

    useEffect(() => {
        // URL에서 검색어 파라미터 가져오기
        const params = new URLSearchParams(location.search);
        const query = params.get("query");

        if (query) {
            setSearchQuery(query);
            handleSearch(query, 1);
        }
    }, [location.search]);

    return (
        <Container>
            <Title>"{searchQuery}" 검색 결과</Title>
            {isLoading && <LoadingOverlay />}
            <MainContent>
                <ResultsContainer>
                    {searchResults.map((book) => (
                        <BookCard key={book.isbn} book={book} />
                    ))}
                </ResultsContainer>
                {searchResults.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </MainContent>
        </Container>
    );
}

export default BookSearchPage;
