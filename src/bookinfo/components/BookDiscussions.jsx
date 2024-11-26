import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RoomItems from "../../asset/component/RoomItems";

const Section = styled.section`
    margin: 20px 0;
    width: 95%;
    margin: 2rem auto;
`;

const SectionTitle = styled.h2`
    font-size: 1.3rem;
    margin-bottom: 20px;
`;

const EmptyStateContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
`;

const CreateGroupButton = styled.button`
    padding: 15px 30px;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: transparent;
    color: #ffffff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

function BookDiscussions({ rooms, imageURL, isbn, bookTitle, author }) {
    const navigate = useNavigate();

    const handleCreateGroup = () => {
        navigate(
            `/create-group?isbn=${isbn}&bookTitle=${bookTitle}&author=${author}`,
            { state: { thumbnail: imageURL } }
        );
    };

    if (!rooms || rooms.length === 0) {
        return (
            <Section>
                <SectionTitle>모임</SectionTitle>
                <EmptyStateContainer>
                    <CreateGroupButton onClick={handleCreateGroup}>
                        모임이 없습니다. 새로운 모임을 만들어보세요!
                    </CreateGroupButton>
                </EmptyStateContainer>
            </Section>
        );
    }

    return (
        <Section>
            <SectionTitle>모임</SectionTitle>
            <RoomItems rooms={rooms} imageURL={imageURL} />
        </Section>
    );
}

export default BookDiscussions;
