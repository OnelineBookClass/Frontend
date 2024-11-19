import { useState } from "react";
import styled from "styled-components";
import SearchBar from "./component/SearchBar";
import BookCard from "./component/BookCard";
import Pagination from "./component/Pagination";

const Container = styled.div`
    padding: 20px;
    max-width: 768px;
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
`;

function BookSearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (results, meta, query) => {
        setSearchResults(results);
        setTotalPages(meta.pageable_count);
        setSearchQuery(query);
        setCurrentPage(meta.current_page);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Container>
            <MainContent>
                <SearchBar
                    onSearch={handleSearch}
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                />
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
