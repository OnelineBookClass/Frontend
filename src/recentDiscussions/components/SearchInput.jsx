import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    margin-top: 1rem;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
`;

function SearchInput() {
    return (
        <>
            <Label htmlFor="search">방 검색</Label>
            <Input placeholder="방 이름을 입력하세요" />
        </>
    );
}

export default SearchInput;
