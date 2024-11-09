import { useState } from "react";
import styled from "styled-components";
import SearchBar from "./component/SearchBar";
import BookCard from "./component/BookCard";

const Container = styled.div`
    padding: 20px;
    max-width: 768px;
    margin: 0 auto;
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

    const handleSearch = (results) => {
        setSearchResults(results);
    };

    return (
        <Container>
            <MainContent>
                <SearchBar onSearch={handleSearch} />
                <ResultsContainer>
                    {searchResults.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </ResultsContainer>
            </MainContent>
        </Container>
    );
}

export default BookSearchPage;
