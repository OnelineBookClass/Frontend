import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 10rem;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
const DiscussionCard = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    background: ${(props) =>
        props.isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(26, 41, 63, 0.05)"};
    border-radius: 12px;
    transition: transform 0.2s ease;
    gap: 1.5rem;
    cursor: pointer;
    &:hover {
        transform: translateX(10px);
    }
`;
const Thumbnail = styled.img`
    width: clamp(80px, 15vw, 120px);
    height: clamp(100px, 20vw, 160px);
    object-fit: cover;
    border-radius: 8px;
`;
const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const RoomTitle = styled.h3`
    margin: 0;
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    font-weight: bold;
`;
const BookTitle = styled.p`
    margin: 0;
    font-size: clamp(0.8rem, 2vw, 1rem);
    opacity: 0.9;
`;
const DiscussionDate = styled.p`
    margin: 0;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    opacity: 0.7;
`;
function DiscussionEntries({ discussions }) {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };
    const handleCardClick = (discussionId) => {
        navigate(`/mydiscussion/${discussionId}`);
    };
    return (
        <Wrapper>
            {discussions.map((discussion) => (
                <DiscussionCard
                    key={discussion.discussionId}
                    onClick={() => handleCardClick(discussion.discussionId)}
                >
                    <Thumbnail
                        src={discussion.thumbnail}
                        alt='책 표지'
                        onError={(e) => {
                            e.target.src = "기본이미지URL";
                        }}
                    />
                    <ContentWrapper>
                        <RoomTitle>{discussion.roomTitle}</RoomTitle>
                        <BookTitle>{discussion.bookTitle}</BookTitle>
                        <DiscussionDate>
                            토론 일시: {formatDate(discussion.discussionDate)}
                        </DiscussionDate>
                    </ContentWrapper>
                </DiscussionCard>
            ))}
        </Wrapper>
    );
}
export default DiscussionEntries;
