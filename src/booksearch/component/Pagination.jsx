import React from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 30px;
`;

const PageButton = styled.button`
    padding: 11px 15px;
    border-radius: 4px;
    border: none;
    background-color: ${(props) => (props.active ? "#23367a" : "#ffffff")};
    color: ${(props) => (props.active ? "white" : "black")};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.active ? "#23367a" : "#f0f0f0")};
    }

    &:disabled {
        background-color: #f0f0f0;
        cursor: not-allowed;
    }
`;

function Pagination({ currentPage, totalPages, onPageChange }) {
    const { isDark } = useTheme();
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
