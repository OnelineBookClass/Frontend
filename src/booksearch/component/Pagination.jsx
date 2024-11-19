import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
`;

const PageButton = styled.button`
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? "#8e0202" : "white")};
    color: ${(props) => (props.active ? "white" : "black")};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.active ? "#8e0202" : "#f0f0f0")};
    }

    &:disabled {
        background-color: #f0f0f0;
        cursor: not-allowed;
    }
`;

function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPageButtons = () => {
        const pages = [];
        const maxPages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(startPage + maxPages - 1, totalPages);

        if (endPage - startPage < maxPages - 1) {
            startPage = Math.max(1, endPage - maxPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PageButton
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </PageButton>
            );
        }

        return pages;
    };

    return (
        <PaginationContainer>
            <PageButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </PageButton>
            {renderPageButtons()}
            <PageButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </PageButton>
        </PaginationContainer>
    );
}

export default Pagination;
